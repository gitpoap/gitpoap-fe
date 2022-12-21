import { useForm, zodResolver } from '@mantine/form';
import { utils } from 'ethers';
import { z } from 'zod';

const isValidAddress = (address: string) => utils.isAddress(address);

export const useAddressForm = () =>
  useForm<{
    address: string;
  }>({
    validate: zodResolver(
      z.object({ address: z.string().refine(isValidAddress, { message: 'Not a valid address' }) }),
    ),
    initialValues: {
      address: '',
    },
  });

export type AddressFormReturnTypes = ReturnType<typeof useAddressForm>;
