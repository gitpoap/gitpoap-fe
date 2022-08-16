import { Input } from '../shared/elements';
import { FormReturnTypes } from './types';

type Props = {
  getInputProps: FormReturnTypes['getInputProps'];
};

export const ContactDetails = ({ getInputProps }: Props) => (
  <>
    <Input style={{ width: '100%' }} label="Name" placeholder="Name" {...getInputProps('name')} />
    <Input
      style={{ width: '100%' }}
      mt="md"
      label="Email"
      placeholder="Email"
      required
      {...getInputProps('email')}
    />
  </>
);
