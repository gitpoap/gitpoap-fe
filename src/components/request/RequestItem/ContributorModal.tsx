import { Modal } from '@mantine/core';
import { rem } from 'polished';
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

export const ContributorModal = ({ isOpen, onClose, contributors }: Props) => {
  const githubHandles = contributors.githubHandles;
  const ethAddresses = contributors.ethAddresses;
  const ensNames = contributors.ensNames;
  const emails = contributors.emails;

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title={<Header style={{ fontSize: rem(30) }}>{'Contributors'}</Header>}
    >
      <Text weight="bold">{'GitHub Handles:'}</Text>
      {githubHandles?.map((githubHandle) => (
        <Text key={githubHandle}>{githubHandle}</Text>
      ))}

      <Text weight="bold" mt={rem(16)}>
        {'ETH Addresses:'}
      </Text>
      {ethAddresses?.map((ethAddress) => (
        <Text key={ethAddress}>{ethAddress}</Text>
      ))}

      <Text weight="bold" mt={rem(16)}>
        {'ENS Names:'}
      </Text>
      {ensNames?.map((ensName) => (
        <Text key={ensName}>{ensName}</Text>
      ))}

      <Text weight="bold" mt={rem(16)}>
        {'Emails:'}
      </Text>
      {emails?.map((email) => (
        <Text key={email}>{email}</Text>
      ))}
    </Modal>
  );
};
