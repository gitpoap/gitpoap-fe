import useMantineForm from './useMantineForm';

export type Repo = {
  name: string;
  full_name: string;
  githubRepoId: number;
  description: string;
  url: string;
  owner: {
    id: string;
    type: 'all' | 'owner' | 'public' | 'private' | 'member';
    name: string;
    avatar_url: string;
    url: string;
  };
  permissions: {
    admin: boolean; // YES
    maintain: boolean; // YES
    push: boolean; // YES
    triage: boolean;
    pull: boolean;
  };
  key: string;
};

export type SimpleRepo = Pick<Repo, 'full_name' | 'githubRepoId' | 'permissions'>;

export type FormFields = {
  githubHandle: string;
  repos: SimpleRepo[];
  shouldGitPOAPDesign: 'true' | 'false';
  isOneGitPOAPPerRepo: 'true' | 'false';
  images: File[];
  name: string;
  email: string;
  notes: string;
};

export type FormReturnTypes = ReturnType<typeof useMantineForm>;
