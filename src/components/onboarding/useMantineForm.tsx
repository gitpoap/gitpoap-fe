import { useForm, zodResolver } from '@mantine/form';

import { createSchema } from './schema';
import { FormFields } from './types';

const useMantineForm = (stage: number, shouldGitPOAPDesign: boolean, githubHandle: string) =>
  useForm<FormFields>({
    schema: zodResolver(createSchema(stage, shouldGitPOAPDesign)),
    initialValues: {
      githubHandle: githubHandle,
      repos: [],
      shouldGitPOAPDesign: 'true',
      isOneGitPOAPPerRepo: 'true',
      images: [],
      name: '',
      email: '',
      notes: '',
    },
  });

export default useMantineForm;
