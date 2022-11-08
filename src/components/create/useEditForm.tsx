import { useForm, zodResolver } from '@mantine/form';
import { GitPOAPRequestEditSchema, GitPOAPRequestEditValues } from '../../lib/api/gitpoapRequest';

export const useEditForm = (initialValues: GitPOAPRequestEditValues) =>
  useForm<GitPOAPRequestEditValues>({
    validate: zodResolver(GitPOAPRequestEditSchema),
    initialValues: initialValues,
  });

export type EditFormReturnTypes = ReturnType<typeof useEditForm>;
