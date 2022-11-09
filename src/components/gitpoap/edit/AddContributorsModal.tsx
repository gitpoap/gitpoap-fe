import { Modal } from '@mantine/core';
import { rem } from 'polished';
import { Header } from '../../shared/elements';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddContributorModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      title={<Header style={{ fontSize: rem(30) }}>{'Add Contributors'}</Header>}
    >
      {'temp content'}
    </Modal>
  );
};
