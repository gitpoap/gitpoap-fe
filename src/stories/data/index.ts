import { DateTime } from 'luxon';
import { GitPOAP, POAP } from '../../types';
import { Project } from '../../types';
import { Stats } from '../../components/home/BannerStats';
import {
  LeadersQuery,
  MostClaimedGitPoapsQuery,
  GitPoapEventQuery,
  StaffApprovalStatus,
} from '../../graphql/generated-gql';
import { Holder } from '../../components/gitpoap/GitPOAPHolders';

/* GitPOAPs */
import badge1 from '../assets/gitPOAPs/badge1.png';
import badge2 from '../assets/gitPOAPs/badge2.png';
import badge3 from '../assets/gitPOAPs/badge3.png';
import badge4 from '../assets/gitPOAPs/badge4.png';
import badge5 from '../assets/gitPOAPs/badge5.png';
import badge6 from '../assets/gitPOAPs/badge6.png';
import badge7 from '../assets/gitPOAPs/badge7.png';

/* POAPs */
import poap1 from '../assets/poaps/poap1.png';
import poap2 from '../assets/poaps/poap2.png';
import poap3 from '../assets/poaps/poap3.png';
import poap4 from '../assets/poaps/poap4.png';
import poap5 from '../assets/poaps/poap5.png';
import poap6 from '../assets/poaps/poap6.png';
import poap7 from '../assets/poaps/poap7.png';
import poap8 from '../assets/poaps/poap8.png';
import poap9 from '../assets/poaps/poap9.png';
import poap10 from '../assets/poaps/poap10.png';
import poap11 from '../assets/poaps/poap11.png';
import poap12 from '../assets/poaps/poap12.png';
import poap13 from '../assets/poaps/poap13.png';
import poap14 from '../assets/poaps/poap14.png';
import poap15 from '../assets/poaps/poap15.png';

export const gitPOAPs: GitPOAP[] = [
  {
    id: 1,
    imgSrc: badge2 as unknown as string,
    name: 'Polygon Genesis Creator',
    repoName: 'Polygon',
    description: 'To the creators of Polygon Network',
  },
  {
    id: 2,
    imgSrc: badge3 as unknown as string,
    name: 'AAVE Contributor 2021',
    repoName: 'AAVE',
    description: 'For all our valuable contributors in 2021',
  },
  {
    id: 3,
    imgSrc: badge1 as unknown as string,
    name: 'AAVE Core Contributor',
    repoName: 'AAVE',
    description: 'Issued to core contributors of AAVE protocol',
  },
  {
    id: 4,
    imgSrc: badge4 as unknown as string,
    name: 'Contributor 2021',
    repoName: 'SUBSPACE',
    description: 'For all Subspace contributors in 2021',
  },
  {
    id: 5,
    imgSrc: badge5 as unknown as string,
    name: 'Contributor 2020',
    repoName: 'SUBSPACE',
    description: 'For all Subspace contributors in 2020',
  },
  {
    id: 6,
    imgSrc: badge6 as unknown as string,
    name: 'Contributor 2019',
    repoName: 'AAVE',
    description: 'For all Subspace contributors in 2019',
  },
  {
    id: 7,
    imgSrc: badge7 as unknown as string,
    name: 'AAVE Contributor 2019',
    repoName: 'AAVE',
    description: 'Everyone who helped us progressing in 2019',
  },
];

export const rawPOAPs: POAP[] = [
  {
    tokenId: '1',
    event: {
      id: 1,
      image_url: poap1 as unknown as string,
      name: '2 LIVES NFT art exhibition',
    },
  },
  {
    tokenId: '2',
    event: {
      id: 2,
      image_url: poap2 as unknown as string,
      name: 'DevOps Summit Canada 2021: Speaker',
    },
  },
  {
    tokenId: '3',
    event: {
      id: 3,
      image_url: poap3 as unknown as string,
      name: 'Mojito at Somewhere Nowhere party',
    },
  },
  {
    tokenId: '4',
    event: {
      id: 4,
      image_url: poap4 as unknown as string,
      name: 'Artifact Technology',
    },
  },
  {
    tokenId: '5',
    event: {
      id: 5,
      image_url: poap5 as unknown as string,
      name: 'Deadfellaz Halloween Happy Hour',
    },
  },

  {
    tokenId: '6',
    event: {
      id: 6,
      image_url: poap6 as unknown as string,
      name: 'DODO 1 year celebration event',
    },
  },
  {
    tokenId: '7',
    event: {
      id: 7,
      image_url: poap7 as unknown as string,
      name: 'Crypto something lecture',
    },
  },
  {
    tokenId: '8',
    event: {
      id: 8,
      image_url: poap8 as unknown as string,
      name: 'Float Capital AMA',
    },
  },
  {
    tokenId: '9',
    event: {
      id: 9,
      image_url: poap9 as unknown as string,
      name: 'NFTs + Philantropy lecture',
    },
  },
  {
    tokenId: '10',
    event: {
      id: 10,
      image_url: poap10 as unknown as string,
      name: 'Shapeshift DAO weekly sprint participant',
    },
  },

  {
    tokenId: '11',
    event: {
      id: 11,
      image_url: poap11 as unknown as string,
      name: '2 LIVES NFT art exhibition',
    },
  },
  {
    tokenId: '12',
    event: {
      id: 12,
      image_url: poap12 as unknown as string,
      name: 'Mojito at Somewhere Nowhere party',
    },
  },
  {
    tokenId: '13',
    event: {
      id: 13,
      image_url: poap13 as unknown as string,
      name: 'Artifact Technology exhibition',
    },
  },
  {
    tokenId: '14',
    event: {
      id: 14,
      image_url: poap14 as unknown as string,
      name: 'Deadfellaz Halloween event',
    },
  },
  {
    tokenId: '15',
    event: {
      id: 15,
      image_url: poap15 as unknown as string,
      name: 'Bitcoin crypto something event',
    },
  },
];

export const projectData: Project[] = [
  {
    id: 1,
    name: 'Acala',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 80,
    // gitPoapCount: 15,
    // stars: 1507,
    // category: 'Exchanges',
    organization: { name: 'Exchanges' },
  },
  {
    id: 2,
    name: 'ACDX',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 44,
    // gitPoapCount: 8,
    // stars: 240,
    // category: 'Blockchain',
    organization: { name: 'Blockchain' },
  },
  {
    id: 3,
    name: 'Aegis',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 9,
    // gitPoapCount: 5,
    // stars: 15,
    // category: 'DAPP',
    organization: { name: 'DAPP' },
  },
  {
    id: 4,
    name: 'YFValue',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 6,
    // gitPoapCount: 2,
    // stars: 912,
    // category: 'DAPP',
    organization: { name: 'DAPP' },
  },
  {
    id: 5,
    name: 'Celo',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 17,
    // gitPoapCount: 3,
    // stars: 492,
    // category: 'Blockchain',
    organization: { name: 'Blockchain' },
  },
  {
    id: 6,
    name: 'Liquidity Vision',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 9,
    // gitPoapCount: 3,
    // stars: 95,
    // category: 'Investing',
    organization: { name: 'Investing' },
  },
  {
    id: 7,
    name: 'Curve',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 36,
    // gitPoapCount: 10,
    // stars: 1024,
    // category: 'Exchanges',
    organization: { name: 'Exchanges' },
  },
  {
    id: 8,
    name: 'SushiSwap',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 48,
    // gitPoapCount: 20,
    // stars: 984,
    // category: 'Exchanges',
    organization: { name: 'Exchanges' },
  },
  {
    id: 9,
    name: 'Polygon',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 80,
    // gitPoapCount: 15,
    // stars: 1507,
    // category: 'Blockchain',
    organization: { name: 'Blockchain' },
  },
  {
    id: 10,
    name: 'AAVE',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 44,
    // gitPoapCount: 8,
    // stars: 973,
    // category: 'Blockchain',
    organization: { name: 'Blockchain' },
  },
  {
    id: 11,
    name: 'Subspace',
    createdAt: DateTime.utc(2017, 5, 15).toISO(),
    // memberCount: 6,
    // gitPoapCount: 2,
    // stars: 85,
    // category: 'DApp',
    organization: { name: 'DApp' },
  },
];

export const leaderData: LeadersQuery['mostHonoredContributors'] = [
  {
    claimsCount: 12,
    profile: {
      address: { ethAddress: '0x123nqg83vm4q' },
      id: 1,
    },
  },
  {
    claimsCount: 11,
    profile: {
      address: { ethAddress: '0x456ng3qq34' },
      id: 2,
    },
  },
  {
    claimsCount: 9,
    profile: {
      address: { ethAddress: '0x6432uau24q3i' },
      id: 2,
    },
  },
  {
    claimsCount: 5,
    profile: {
      address: { ethAddress: '0xc32n542' },
      id: 2,
    },
  },
  {
    claimsCount: 5,
    profile: {
      address: { ethAddress: '0x7go48w584' },
      id: 2,
    },
  },
];

export const stats: Stats[] = [
  {
    value: 17545,
    unit: 'contributors',
    rate: 345,
    icon: 'people',
  },
  {
    value: 1015,
    unit: 'GitPOAPs',
    rate: 154,
    icon: 'gitPOAP',
  },
  {
    value: 549,
    unit: 'projects',
    rate: 17,
    icon: 'project',
  },
];

export const mostClaimed: MostClaimedGitPoapsQuery['mostClaimedGitPOAPs'] = [
  {
    claimsCount: 35,
    gitPOAP: {
      id: 1,
      project: {
        repos: [
          {
            id: 1,
            name: 'Polygon',
            organization: {
              name: 'Polygon',
            },
          },
        ],
      },
    },
    event: {
      name: 'Polygon Genesis Creator',
      image_url: badge2 as unknown as string,
    },
  },
  {
    claimsCount: 22,
    gitPOAP: {
      id: 2,
      project: {
        repos: [
          {
            id: 2,
            name: 'AAVE',
            organization: {
              name: 'AAVE',
            },
          },
        ],
      },
    },
    event: {
      name: 'AAVE Contributor 2021',
      image_url: badge3 as unknown as string,
    },
  },
  {
    claimsCount: 10,
    gitPOAP: {
      id: 3,
      project: {
        repos: [
          {
            id: 2,
            name: 'AAVE',
            organization: {
              name: 'AAVE',
            },
          },
        ],
      },
    },
    event: {
      name: 'AAVE Core Contributor',
      image_url: badge1 as unknown as string,
    },
  },
];

export const gitPOAPHolders: Holder[] = [
  {
    address: '0xae95f7e7fb2fcf86148ef832faed2752ae5a358a',
    githubHandle: 'burz',
    gitPOAPCount: 3,
    profileId: 4,
    bio: 'I am addicted to POAPs',
    personalSiteUrl: undefined,
    twitterHandle: undefined,
    ensName: null,
    ensAvatarUrl: null,
  },
  {
    address: '0x56d389c4e07a48d429035532402301310b8143a0',
    githubHandle: 'colfax23',
    gitPOAPCount: 1,
    profileId: 1,
    bio: 'I like brisket.',
    personalSiteUrl: undefined,
    twitterHandle: undefined,
    ensName: null,
    ensAvatarUrl: null,
  },
  {
    address: '0x206e554084beec98e08043397be63c5132cc01a1',
    githubHandle: 'burzzzzz',
    gitPOAPCount: 1,
    profileId: 5,
    bio: 'I am not real',
    personalSiteUrl: undefined,
    twitterHandle: undefined,
    ensName: null,
    ensAvatarUrl: null,
  },
];

export const gitPOAPEvent: GitPoapEventQuery = {
  gitPOAPEvent: {
    gitPOAP: {
      id: 1,
      project: {
        repos: [
          {
            id: 1,
            name: 'gitpoap-fe',
            organization: {
              id: 4,
              name: 'gitpoap',
            },
          },
        ],
      },
    },
    event: {
      name: 'GitPOAP Strategy Meeting - EthDenver 2022',
      image_url:
        'https://assets.poap.xyz/gitpoap-strategy-meeting-ethdenver-2022-2022-logo-1645132648036.png',
      description:
        'This commemorates a meeting of wonderful folks discussing the future of decentralized reputation and how GitPOAP can contribute to it.',
    },
  },
};

export const gitPOAPRequests = [
  {
    id: 10,
    createdAt: '2021-12-01',
    updatedAt: '2021-12-01',
    name: '2022 Custom GitPOAPs Release Contributor!',
    description: "You're a contributor to the 2022 Custom GitPOAPs Release!",
    imageUrl:
      'https://gitpoap-request-images-test.s3.us-east-2.amazonaws.com/gitpoap-test-2.png-1666121850.987',
    startDate: '2021-12-01',
    endDate: '2022-01-01',
    expiryDate: '2022-02-01',
    numRequestedCodes: 100,
    creatorEmail: {
      emailAddress: 'team@gitpoap.io',
    },
    address: {
      ethAddress: '0xae95f7e7fb2fcf86148ef832faed2752ae5a358a',
    },
    staffApprovalStatus: StaffApprovalStatus.Pending,
    contributors: {
      githubHandles: ['peebeejay', 'burz'],
      ethAddresses: ['0x1d82C486CC5f243F379F52B5eA7A205D091dc7C5'],
      ensNames: ['nick.eth'],
      emails: ['blah@gitpoap.io'],
    },
  },
  {
    id: 2,
    createdAt: '2021-12-01',
    updatedAt: '2021-12-01',
    name: '2022 GitPOAP Marketing Push Team Member!',
    description: "This denotes that you're a contributor to the 2022 Marketing Push!",
    imageUrl:
      'https://gitpoap-request-images-test.s3.us-east-2.amazonaws.com/gitpoap-test-1.png-1666121850.987',
    startDate: '2021-12-01',
    endDate: '2022-01-01',
    expiryDate: '2022-02-01',
    numRequestedCodes: 27,
    creatorEmail: {
      emailAddress: 'team@gitpoap.io',
    },
    address: {
      ethAddress: '0xae95f7e7fb2fcf86148ef832faed2752ae5a358a',
    },
    staffApprovalStatus: StaffApprovalStatus.Pending,
    contributors: {
      githubHandles: ['peebeejay', 'burz', 'colfax23'],
      ethAddresses: ['0x1d82C486CC5f243F379F52B5eA7A205D091dc7C5'],
      ensNames: ['burz.eth', 'colfax.eth'],
      emails: ['aldo@gitpoap.io', 'tyler@gitpoap.io'],
    },
  },
];

export const userMemberships = {
  memberships: [
    {
      id: 5,
      teamId: 3,
      team: {
        name: 'Ethereum team',
        __typename: 'Team',
      },
      addressId: 7,
      address: {
        ethAddress: '0x8404ddf7ed9cce1efdc14f3af4c8ed0015d28937',
        ensName: null,
        __typename: 'Address',
      },
      joinedOn: '2022-12-22T12:50:15.112Z',
      role: 'MEMBER',
      acceptanceStatus: 'ACCEPTED',
      createdAt: '2022-12-22T11:49:00.261Z',
      __typename: 'MembershipWithTeam',
    },
    {
      id: 73,
      teamId: 5,
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      addressId: 7,
      address: {
        ethAddress: '0x8404ddf7ed9cce1efdc14f3af4c8ed0015d28937',
        ensName: null,
        __typename: 'Address',
      },
      joinedOn: null,
      role: 'ADMIN',
      acceptanceStatus: 'PENDING',
      createdAt: '2023-01-04T11:48:35.800Z',
      __typename: 'MembershipWithTeam',
    },
    {
      id: 4,
      teamId: 2,
      team: {
        name: 'GitPoap dev team',
        __typename: 'Team',
      },
      addressId: 7,
      address: {
        ethAddress: '0x8404ddf7ed9cce1efdc14f3af4c8ed0015d28937',
        ensName: null,
        __typename: 'Address',
      },
      joinedOn: '2023-01-04T00:27:22.337Z',
      role: 'MEMBER',
      acceptanceStatus: 'ACCEPTED',
      createdAt: '2022-12-22T11:49:00.254Z',
      __typename: 'MembershipWithTeam',
    },
  ],
};

export const teamMemberships = {
  total: 5,
  memberships: [
    {
      id: 73,
      addressId: 7,
      address: {
        ethAddress: '0x8404ddf7ed9cce1efdc14f3af4c8ed0015d28937',
        ensName: null,
        __typename: 'Address',
      },
      joinedOn: '2023-01-04T12:43:11.676Z',
      role: 'ADMIN',
      acceptanceStatus: 'ACCEPTED',
      createdAt: '2023-01-04T11:48:35.800Z',
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      __typename: 'MembershipWithTeam',
    },
    {
      id: 74,
      addressId: 8,
      address: {
        ethAddress: '0x04c0cd38b8c203b14ef2b7b8d736d69b938aff71',
        ensName: 'nixorokish.eth',
        __typename: 'Address',
      },
      joinedOn: null,
      role: 'ADMIN',
      acceptanceStatus: 'PENDING',
      createdAt: '2023-01-04T12:39:16.465Z',
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      __typename: 'MembershipWithTeam',
    },
    {
      id: 75,
      addressId: 6,
      address: {
        ethAddress: '0x02738d122e0970aaf8deadf0c6a217a1923e1e99',
        ensName: 'lamberti.eth',
        __typename: 'Address',
      },
      joinedOn: null,
      role: 'ADMIN',
      acceptanceStatus: 'PENDING',
      createdAt: '2023-01-04T12:39:16.508Z',
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      __typename: 'MembershipWithTeam',
    },
    {
      id: 76,
      addressId: 1,
      address: {
        ethAddress: '0xae32d159bb3abfcadfabe7abb461c2ab4805596d',
        ensName: 'peebeejay.eth',
        __typename: 'Address',
      },
      joinedOn: null,
      role: 'ADMIN',
      acceptanceStatus: 'PENDING',
      createdAt: '2023-01-04T12:39:16.521Z',
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      __typename: 'MembershipWithTeam',
    },
    {
      id: 77,
      addressId: 2,
      address: {
        ethAddress: '0xae95f7e7fb2fcf86148ef832faed2752ae5a358a',
        ensName: 'burz.eth',
        __typename: 'Address',
      },
      joinedOn: null,
      role: 'ADMIN',
      acceptanceStatus: 'PENDING',
      createdAt: '2023-01-04T12:39:16.519Z',
      team: {
        name: 'target transparent models',
        __typename: 'Team',
      },
      __typename: 'MembershipWithTeam',
    },
  ],
  __typename: 'TeamMemberships',
};
