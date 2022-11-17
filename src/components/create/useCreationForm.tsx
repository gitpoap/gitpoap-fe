import { useForm, zodResolver } from '@mantine/form';
import { DateTime } from 'luxon';

import { CreateFormValues, CreateFormValidationSchema } from '../../lib/api/gitpoapRequest';

const defaultInitialValues: CreateFormValues = {
  name: '',
  description: '',
  startDate: DateTime.local().toJSDate(),
  endDate: null,
  creatorEmail: '',
  contributors: [],
  image: null,
};

export const useCreationForm = () =>
  useForm<CreateFormValues>({
    validate: zodResolver(CreateFormValidationSchema),
    initialValues: defaultInitialValues,
  });

export type CreationFormReturnTypes = ReturnType<typeof useCreationForm>;
