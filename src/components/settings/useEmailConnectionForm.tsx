import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

export const useEmailConnectionForm = () =>
  useForm<{
    email: string;
  }>({
    validate: zodResolver(z.object({ email: z.string().email() })),
    initialValues: {
      email: '',
    },
  });

export type EmailConnectionFormReturnTypes = ReturnType<typeof useEmailConnectionForm>;
