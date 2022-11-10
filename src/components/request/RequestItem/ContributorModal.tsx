import { Badge, Group, Modal, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useMemo } from 'react';
import { Text, Header } from '../../shared/elements';

export type ContributorsType = {
  githubHandles?: string[];
  ethAddresses?: string[];
  ensNames?: string[];
  emails?: string[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  contributors: ContributorsType;
};

const contributorTypeCopy = {
  githubHandles: 'GitHub',
  ethAddresses: 'ETH',
  ensNames: 'ENS',
  emails: 'Email',
};

export const ContributorModal = ({ isOpen, onClose, contributors }: Props) => {
  const generateContributorsList = useMemo(() => {
    const contributorsList = [];

    const contributorTypes = Object.keys(contributors) as (keyof ContributorsType)[];

    for (const contributorType of contributorTypes) {
      const contributorTypeList = contributors[contributorType];

      if (contributorTypeList) {
        for (const contributor of contributorTypeList) {
          contributorsList.push({ contributorType, name: contributor });
        }
      }
    }

    return contributorsList;
  }, [contributors]);

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title={<Header style={{ fontSize: rem(30) }}>{'Contributors'}</Header>}
    >
      <Stack>
        {generateContributorsList.map((contributor, index) => (
          <Group key={`${index}-contributor-list`}>
            <Text>{`${contributor.name}`}</Text>
            <Badge sx={{ color: 'white' }}>
              {contributorTypeCopy[contributor.contributorType]}
            </Badge>
          </Group>
        ))}
      </Stack>
    </Modal>
  );
};
