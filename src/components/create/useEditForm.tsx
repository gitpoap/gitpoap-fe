import { useForm, zodResolver } from '@mantine/form';
import { EditFormValues, EditFormValidationSchema } from '../../lib/api/gitpoapRequest';

function addTimezoneOffset(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + timezoneOffset);
}

export const useEditForm = (initialValues: EditFormValues, hasRemovedSavedImage: boolean) =>
  useForm<EditFormValues>({
    validate: zodResolver(EditFormValidationSchema(hasRemovedSavedImage)),
    // Setting image to {} instead of null allows us to detect if it's been cleared
    initialValues: {
      ...initialValues,
      startDate: addTimezoneOffset(initialValues.startDate),
      endDate: addTimezoneOffset(initialValues.endDate),
    },
  });

export type EditFormReturnTypes = ReturnType<typeof useEditForm>;
