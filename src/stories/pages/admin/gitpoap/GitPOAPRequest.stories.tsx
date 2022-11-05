import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAPRequest } from '../../../../components/admin/GitPOAPRequest';
import { AdminApprovalStatus } from '../../../../graphql/generated-gql';

export default {
  title: 'Admin/GitPOAPRequest',
  component: GitPOAPRequest,
} as ComponentMeta<typeof GitPOAPRequest>;

const Template: ComponentStory<typeof GitPOAPRequest> = (args) => {
  return <GitPOAPRequest {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  gitPOAPRequest: {
    id: 10,
    name: '2022 Custom GitPOAPs Release Contributor!',
    description: "You're a contributor to the 2022 Custom GitPOAPs Release!",
    imageKey: 'poap10.png-1666121881.581',
    startDate: '2021-12-01',
    endDate: '2022-01-01',
    expiryDate: '2022-02-01',
    numRequestedCodes: 100,
    email: 'team@gitpoap.io',
    adminApprovalStatus: AdminApprovalStatus.Pending,
    contributors: {
      githubHandles: ['peebeejay', 'burz'],
      ethAddresses: ['0x1d82C486CC5f243F379F52B5eA7A205D091dc7C5'],
      ensNames: ['nick.eth'],
      emails: ['blah@gitpoap.io'],
    },
  },
};
