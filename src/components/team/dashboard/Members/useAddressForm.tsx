import { useForm, zodResolver } from '@mantine/form';
import { utils } from 'ethers';
import { z } from 'zod';

const isValidAddress = (addresses: string) =>
  addresses.split(',').every((address) => utils.isAddress(address.trim()));

export const useAddressForm = () =>
  useForm<{
    addresses: string;
  }>({
    validate: zodResolver(
      z.object({
        addresses: z.string().refine(isValidAddress, { message: 'Not valid addresses' }),
      }),
    ),
    initialValues: {
      addresses: '',
    },
  });

export type AddressFormReturnTypes = ReturnType<typeof useAddressForm>;
