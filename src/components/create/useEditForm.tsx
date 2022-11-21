import { useForm, zodResolver } from '@mantine/form';
import { EditFormValues, EditFormValidationSchema } from '../../lib/api/gitpoapRequest';

export const useEditForm = (initialValues: EditFormValues, hasRemovedSavedImage: boolean) =>
  useForm<EditFormValues>({
    initialValues,
    validate: zodResolver(EditFormValidationSchema(hasRemovedSavedImage)),
  });

export type EditFormReturnTypes = ReturnType<typeof useEditForm>;
