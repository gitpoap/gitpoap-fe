import { showNotification } from '@mantine/notifications';
import { useCallback, useEffect, useState } from 'react';
import { isValidURL } from '../helpers';
import { NotificationFactory } from '../notifications';

export const useGetGHRepoId = (repoUrlSeed: string): [number | null, string | null] => {
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

      if (!res.ok) {
        throw new Error(res.statusText);
      }

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
    } catch (err) {
      console.warn(err);
      showNotification(
        NotificationFactory.createError(
          'Error - Request to fetch Github Repo ID failed',
          'Oops, something went wrong! 🤥',
        ),
      );
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
    }
  }, [eventUrl, fetchGitHubRepoId, repoUrlSeed]);

  return [githubRepoId, eventUrl];
};
