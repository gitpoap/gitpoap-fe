import { Modal, Stack } from '@mantine/core';
import { rem } from 'polished';
import { useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { GitPOAPCreateClaimsValues } from '../../../lib/api/gitpoap';
import { Contributor, SelectContributors } from '../../create/SelectContributors';
import { StatusButton, ButtonStatus } from '../../shared/compounds/StatusButton';
import { Header } from '../../shared/elements';

type Props = {
  gitPOAPId: number;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export const AddContributorModal = ({ gitPOAPId, isOpen, onClose, refetch }: Props) => {
  const api = useApi();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const handleSubmit = async () => {
    setButtonStatus(ButtonStatus.LOADING);

    if (!contributors.length) {
      return;
    }

    const formattedContributors = contributors.reduce(
      (group: GitPOAPCreateClaimsValues['contributors'], contributor) => {
        const { type, value }: Contributor = contributor;
        group[type] = group[type] || [];
        group[type]?.push(value);
        return group;
      },
      {},
    );

    const data = await api.gitpoap.addContributors({
      gitPOAPId,
      contributors: formattedContributors,
    });

    if (data === null) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    setButtonStatus(ButtonStatus.INITIAL);
    setTimeout(() => refetch(), 500);
    setContributors([]);
    onClose();
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      size="md"
      title={<Header style={{ fontSize: rem(30) }}>{'Add Contributors'}</Header>}
    >
      <Stack spacing={32}>
        <SelectContributors contributors={contributors} setContributors={setContributors} />
        <StatusButton
          isDisabled={
            !contributors.length ||
            buttonStatus === ButtonStatus.SUCCESS ||
            buttonStatus === ButtonStatus.LOADING
          }
          status={buttonStatus}
          onClick={handleSubmit}
        >
          {'Add Contributors'}
        </StatusButton>
      </Stack>
    </Modal>
  );
};
