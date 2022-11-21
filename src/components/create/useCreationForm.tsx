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
    initialValues: defaultInitialValues,
    validate: zodResolver(CreateFormValidationSchema),
  });

export type CreationFormReturnTypes = ReturnType<typeof useCreationForm>;
