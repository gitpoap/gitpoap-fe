import { useForm, zodResolver } from '@mantine/form';

import { createSchema } from './schema';
import { CreationFormFields } from './types';

export const useCreationForm = (initialValues: CreationFormFields) =>
  useForm<CreationFormFields>({
    validate: zodResolver(createSchema),
    initialValues,
  });
