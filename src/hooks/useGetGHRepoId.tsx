import { useCallback, useEffect, useState } from 'react';
import { isValidURL } from '../helpers';
import { Notifications } from '../notifications';

type UserGHRepoReturnType = [number | null, string | null];

export const useGetGHRepoId = (repoUrlSeed: string): UserGHRepoReturnType => {
  const [eventUrl, setEventUrl] = useState<string | null>(null);
  const [githubRepoId, setGithubRepoId] = useState<number | null>(null);

  const fetchGitHubRepoId = useCallback(async (orgOrUserName: string, repoName: string) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${orgOrUserName}/${repoName}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const repoData = (await res.json()) as {
          id: number;
          name: string;
          full_name: string;
          private: boolean;
        };

        if (repoData.id) {
          setGithubRepoId(repoData.id);
          setEventUrl(`https://github.com/${orgOrUserName}/${repoName}`);
        }
      } else {
        throw res;
      }
    } catch (err) {
      setGithubRepoId(null);
      setEventUrl(null);

      if ((err as Response).status === 404) {
        return;
      }

      console.warn(err);
      Notifications.error('Error - Request to fetch Github Repo ID failed');
    }
  }, []);

  useEffect(() => {
    if (isValidURL(repoUrlSeed) && eventUrl !== repoUrlSeed) {
      const url = new URL(repoUrlSeed);
      const pathStrs = url.pathname.split('/');
      if (
        pathStrs.length === 3 &&
        !!pathStrs[1] &&
        !!pathStrs[2] &&
        url.origin === 'https://github.com'
      ) {
        fetchGitHubRepoId(pathStrs[1], pathStrs[2]);
      }
    } else if (!isValidURL(repoUrlSeed)) {
      /* Clear repo ID and event URL if there is no repoUrlSeed */
      if (githubRepoId !== null) {
        setGithubRepoId(null);
      }
      if (eventUrl !== null) {
        setEventUrl(null);
      }
    }
  }, [eventUrl, fetchGitHubRepoId, repoUrlSeed, githubRepoId]);

  return [githubRepoId, eventUrl];
};
