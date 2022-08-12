type Repo = {
  name: string;
  full_name: string;
  githubRepoId: string;
  description: string;
  url: string;
  owner: {
    name: string;
    type: 'all' | 'owner' | 'public' | 'private' | 'member';
    githubOrganizationId: string;
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
};

export const ReposResponse = [
  {
    name: 'gitpoap-landing',
    full_name: 'gitpoap/gitpoap-landing',
    githubRepoId: 3,
    description: 'Docs',
    url: 'github.com/gitpoap/gitpoap-landing',
    owner: {
      id: 1,
      type: 'public',
      name: 'gitpoap',
      avatar_url: '',
      url: '',
    },
    permissions: {
      admin: false, // YES
      maintain: false, // YES
      push: false, // YES
      triage: true,
      pull: true,
    },
  },
  {
    name: 'gitpoap-fe',
    full_name: 'gitpoap/gitpoap-fe',
    githubRepoId: 1,
    description: 'Frontend',
    url: 'github.com/gitpoap/gitpoap-fe',
    owner: {
      id: 1,
      type: 'public',
      name: 'gitpoap',
      avatar_url: '',
      url: '',
    },
    permissions: {
      admin: true, // YES
      maintain: true, // YES
      push: true, // YES
      triage: true,
      pull: true,
    },
  },
  {
    name: 'gitpoap-backend',
    full_name: 'gitpoap/gitpoap-backend',
    githubRepoId: 2,
    description: 'Backend',
    url: 'github.com/gitpoap/gitpoap-backend',
    owner: {
      id: 1,
      type: 'private',
      name: 'gitpoap',
      avatar_url: '',
      url: '',
    },
    permissions: {
      admin: true, // YES
      maintain: true, // YES
      push: true, // YES
      triage: true,
      pull: true,
    },
  },
  {
    name: 'gitpoap-docs',
    full_name: 'gitpoap/gitpoap-docs',
    githubRepoId: 3,
    description: 'Docs',
    url: 'github.com/gitpoap/gitpoap-docs',
    owner: {
      id: 1,
      type: 'public',
      name: 'gitpoap',
      avatar_url: '',
      url: '',
    },
    permissions: {
      admin: true, // YES
      maintain: true, // YES
      push: true, // YES
      triage: true,
      pull: true,
    },
  },
  {
    name: 'randRepo',
    full_name: 'randOrg/randRepo',
    githubRepoId: 4,
    description: 'Docs',
    url: 'github.com/randOrg/randRepo',
    owner: {
      id: 2,
      type: 'public',
      name: 'randOrg',
      avatar_url: '',
      url: '',
    },
    permissions: {
      admin: true, // YES
      maintain: true, // YES
      push: true, // YES
      triage: true,
      pull: true,
    },
  },
];

export const generateListOfRepos = (length: number) =>
  Array.from(Array(length).keys()).map((i) => {
    return {
      name: 'repo',
      full_name: `org/repo${i}`,
      githubRepoId: i,
      description: 'Docs',
      url: `github.com/org/repo${i}`,
      owner: {
        id: 1,
        type: 'public',
        name: 'org',
        avatar_url: '',
        url: '',
      },
      permissions: {
        admin: true,
        maintain: true,
        push: true,
        triage: true,
        pull: true,
      },
    };
  });
