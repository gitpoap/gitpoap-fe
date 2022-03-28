import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ClaimModal } from '../../components/ClaimModal';
import { UserClaim } from '../../types';
import badgeImg1 from '../assets/gitPOAPs/badge1.png';
import badgeImg2 from '../assets/gitPOAPs/badge2.png';
import badgeImg3 from '../assets/gitPOAPs/badge3.png';
import badgeImg4 from '../assets/gitPOAPs/badge4.png';

const claims: UserClaim[] = [
  {
    claim: {
      id: 1,
      gitPOAP: {
        repo: {
          organization: {
            name: 'Polygon',
          },
        },
      },
    },
    event: {
      id: 1,
      name: 'Polygon Genesis Creator',
      image_url: badgeImg1 as unknown as string,
      description: 'To the creators of Polygon Network',
    },
  },
  {
    claim: {
      id: 2,
      gitPOAP: {
        repo: {
          organization: {
            name: 'AAVE',
          },
        },
      },
    },
    event: {
      id: 2,
      name: 'AAVE Contributor 2021',
      image_url: badgeImg2 as unknown as string,
      description: 'For all our valuable contributors in 2021',
    },
  },
  {
    claim: {
      id: 3,
      gitPOAP: {
        repo: {
          organization: {
            name: 'AAVE',
          },
        },
      },
    },
    event: {
      id: 3,
      name: 'AAVE Core Contributor',
      image_url: badgeImg3 as unknown as string,
      description: 'Issued to core contributors of AAVE protocol',
    },
  },
  {
    claim: {
      id: 4,
      gitPOAP: {
        repo: {
          organization: {
            name: 'Swype Protocol',
          },
        },
      },
    },
    event: {
      id: 4,
      name: 'Swype Protocol Purple Contributor',
      image_url: badgeImg4 as unknown as string,
      description:
        'Issued to core contributors who have given back to the community enough to meet the requirements of level purple',
    },
  },
];

export default {
  title: 'Modals/Claim',
  component: ClaimModal,
  argTypes: {},
} as ComponentMeta<typeof ClaimModal>;

const Template: ComponentStory<typeof ClaimModal> = (args) => {
  return <ClaimModal {...args} />;
};

/* -- Single Claim -- */
export const SingleClaim = Template.bind({});
SingleClaim.args = { claims: claims.slice(0, 1), isOpen: true };

export const SingleClaimLoading = Template.bind({});
SingleClaimLoading.args = { claims: claims.slice(0, 1), isOpen: true, loadingClaimIds: [1] };

export const SingleClaimClaimed = Template.bind({});
SingleClaimClaimed.args = { claims: claims.slice(0, 1), isOpen: true, claimedIds: [1] };

/* -- Two Claims -- */
export const TwoClaims = Template.bind({});
TwoClaims.args = { claims: claims.slice(0, 2), isOpen: true };

export const TwoClaimsAllLoading = Template.bind({});
TwoClaimsAllLoading.args = { claims: claims.slice(0, 2), isOpen: true, loadingClaimIds: [1, 2] };

export const TwoClaimsAllClaimed = Template.bind({});
TwoClaimsAllClaimed.args = { claims: claims.slice(0, 2), isOpen: true, claimedIds: [1, 2] };

export const TwoClaimsOneLoading = Template.bind({});
TwoClaimsOneLoading.args = { claims: claims.slice(0, 2), isOpen: true, loadingClaimIds: [1] };

export const TwoClaimsOneClaimed = Template.bind({});
TwoClaimsOneClaimed.args = { claims: claims.slice(0, 2), isOpen: true, claimedIds: [1] };

/* -- Multiple Claims -- */
export const MultipleClaims = Template.bind({});
MultipleClaims.args = { claims: claims, isOpen: true };

/* -- No Claims -- */
export const NoClaims = Template.bind({});
NoClaims.args = { claims: [], isOpen: true };
