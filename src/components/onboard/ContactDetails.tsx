import { Container } from '@mantine/core';

import { Input, TextArea } from '../shared/elements';
import { FormReturnTypes } from './types';

type Props = {
  getInputProps: FormReturnTypes['getInputProps'];
};

export const ContactDetails = ({ getInputProps }: Props) => (
  <Container mt="xl">
    <Input style={{ width: '100%' }} label="Name" placeholder="Name" {...getInputProps('name')} />
    <Input
      style={{ width: '100%' }}
      mt="md"
      label="Email"
      placeholder="Email"
      required
      {...getInputProps('email')}
    />
    <TextArea
      style={{ width: '100%' }}
      mt="md"
      label="Notes"
      placeholder="Notes"
      {...getInputProps('notes')}
    />
  </Container>
);
