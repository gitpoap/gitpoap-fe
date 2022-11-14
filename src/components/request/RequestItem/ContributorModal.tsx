import { Badge, Group, Modal, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useMemo } from 'react';
import { truncateAddress } from '../../../helpers';
import { convertContributorObjectToList } from '../../create/EditForm';
import { Contributor } from '../../create/SelectContributors';
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
  invalid: 'Invalid',
};

export const ContributorModal = ({ isOpen, onClose, contributors }: Props) => {
  const generateContributorsList: Contributor[] = useMemo(
    () => convertContributorObjectToList(contributors),
    [contributors],
  );

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title={<Header style={{ fontSize: rem(30) }}>{'Contributors'}</Header>}
    >
      <Stack>
        {generateContributorsList.map((contributor, index) => {
          const { type, value } = contributor;
          return (
            <Group key={`${index}-contributor-list`}>
              <Text>{`${type === 'ethAddresses' ? truncateAddress(value, 6, 4) : value}`}</Text>
              <Badge>{contributorTypeCopy[type]}</Badge>
            </Group>
          );
        })}
      </Stack>
    </Modal>
  );
};
