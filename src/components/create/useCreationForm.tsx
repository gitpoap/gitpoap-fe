import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';

import {
  GitPOAPRequestCreateSchema,
  GitPOAPRequestCreateValues,
} from '../../lib/api/gitpoapRequest';

const defaultInitialValues: GitPOAPRequestCreateValues = {
  name: '',
  description: '',
  startDate: DateTime.local().toJSDate(),
  endDate: null,
  creatorEmail: '',
  contributors: {},
  image: null,
};

export const useCreationForm = () =>
  useForm<GitPOAPRequestCreateValues>({
    validate: zodResolver(GitPOAPRequestCreateSchema),
    initialValues: defaultInitialValues,
  });

export type CreationFormReturnTypes = ReturnType<typeof useCreationForm>;
