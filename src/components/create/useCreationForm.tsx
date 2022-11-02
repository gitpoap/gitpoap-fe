import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';

import { THIS_YEAR } from '../../constants';
import {
  GitPOAPRequestCreateSchema,
  GitPOAPRequestCreateValues,
} from '../../lib/api/gitpoapRequest';

const DEFAULT_START_DATE = DateTime.local().toJSDate();
const DEFAULT_END_DATE = DateTime.local().toJSDate();
const DEFAULT_EXPIRY_DATE = DateTime.local(THIS_YEAR + 1, 4, 1).toJSDate();

const defaultInitialValues: GitPOAPRequestCreateValues = {
  name: '',
  contributors: {},
  description: '',
  startDate: DEFAULT_START_DATE,
  endDate: DEFAULT_END_DATE,
  expiryDate: DEFAULT_EXPIRY_DATE,
  eventUrl: 'https://gitpoap.io',
  email: 'issuer@gitpoap.io',
  numRequestedCodes: 20,
  ongoing: true,
  isEnabled: true,
  image: null,
};

export const useCreationForm = (initialValues?: GitPOAPRequestCreateValues) =>
  useForm<GitPOAPRequestCreateValues>({
    validate: zodResolver(GitPOAPRequestCreateSchema),
    initialValues: initialValues ?? defaultInitialValues,
  });

export type CreationFormReturnTypes = ReturnType<typeof useCreationForm>;
