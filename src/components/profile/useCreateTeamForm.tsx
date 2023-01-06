import { useForm, zodResolver } from '@mantine/form';
import { CreateTeamFormValues, CreateTeamFormValidationSchema } from '../../lib/api/team';

const defaultInitialValues: CreateTeamFormValues = {
  name: '',
  description: '',
  image: null,
};

export const useCreateTeamForm = () =>
  useForm<CreateTeamFormValues>({
    initialValues: defaultInitialValues,
    validate: zodResolver(CreateTeamFormValidationSchema),
  });

export type CreateTeamFormReturnTypes = ReturnType<typeof useCreateTeamForm>;
