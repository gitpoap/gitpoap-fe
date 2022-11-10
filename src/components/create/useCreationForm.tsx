import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';

import {
  GitPOAPRequestCreateSchema,
  GitPOAPRequestCreateValues,
} from '../../lib/api/gitpoapRequest';

const DEFAULT_START_DATE = DateTime.local().toJSDate();
const DEFAULT_END_DATE = DateTime.local().toJSDate();

const defaultInitialValues: GitPOAPRequestCreateValues = {
  name: '',
  contributors: {},
  description: '',
  startDate: DEFAULT_START_DATE,
  endDate: DEFAULT_END_DATE,
  creatorEmail: '',
  ongoing: true,
  isEnabled: true,
  image: null,
};

export const useCreationForm = () =>
  useForm<GitPOAPRequestCreateValues>({
    validate: zodResolver(GitPOAPRequestCreateSchema),
    initialValues: defaultInitialValues,
  });

export type CreationFormReturnTypes = ReturnType<typeof useCreationForm>;
