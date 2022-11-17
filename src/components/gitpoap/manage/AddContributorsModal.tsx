import { Modal, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useApi } from '../../../hooks/useApi';
import {
  ContributorsObject,
  UnvalidatedContributor,
  ValidatedContributor,
  ValidatedContributorSchema,
} from '../../../lib/api/gitpoapRequest';
import { SelectContributors } from '../../create/SelectContributors';
import { StatusButton, ButtonStatus } from '../../shared/compounds/StatusButton';
import { Header } from '../../shared/elements';

type Props = {
  gitPOAPId: number;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

type AddContributorsFormValues = {
  contributors: UnvalidatedContributor[];
};

export const AddContributorsValidationSchema = z.object({
  contributors: z.array(ValidatedContributorSchema).min(1),
});
type ValidatedAddContributorsFormValues = z.infer<typeof AddContributorsValidationSchema>;

export const AddContributorModal = ({ gitPOAPId, isOpen, onClose, refetch }: Props) => {
  const api = useApi();
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(ButtonStatus.INITIAL);
  const { values, insertListItem, isDirty, removeListItem, reset, setDirty, validate } =
    useForm<AddContributorsFormValues>({ validate: zodResolver(AddContributorsValidationSchema) });

  useEffect(() => {
    setDirty({ contributors: values.contributors.length > 0 });
  }, [values.contributors]);

  const handleSubmit = async () => {
    setButtonStatus(ButtonStatus.LOADING);

    if (validate().hasErrors) {
      setButtonStatus(ButtonStatus.ERROR);
      return;
    }

    const validatedFormValues = values as ValidatedAddContributorsFormValues;

    const formattedContributors = validatedFormValues.contributors.reduce(
      (group: ContributorsObject, contributor) => {
        const { type, value }: ValidatedContributor = contributor;
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
    reset();
    onClose();
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={onClose}
      size="xl"
      title={<Header style={{ fontSize: rem(30) }}>{'Add Contributors'}</Header>}
    >
      <Stack spacing={32}>
        <SelectContributors
          contributors={values.contributors}
          addContributor={(item) => insertListItem('contributors', item)}
          removeContributor={(index) => removeListItem('contributors', index)}
        />
        <StatusButton
          isDisabled={
            !isDirty() ||
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
