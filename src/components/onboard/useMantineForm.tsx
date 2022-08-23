import { useForm, zodResolver } from '@mantine/form';

import { createSchema } from './schema';
import { FormFields } from './types';

const useMantineForm = (stage: number, githubHandle: string) =>
  useForm<FormFields>({
    validate: zodResolver(createSchema(stage)),
    initialValues: {
      githubHandle: githubHandle,
      repos: [],
      shouldGitPOAPDesign: 'true',
      isOneGitPOAPPerRepo: 'false',
      images: [],
      name: '',
      email: '',
      notes: '',
    },
  });

export default useMantineForm;
