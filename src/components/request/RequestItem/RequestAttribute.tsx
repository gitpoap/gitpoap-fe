import { Group, Text } from '@mantine/core';
import { rem } from 'polished';
import { TextGray } from '../../../colors';
import { Link } from '../../shared/compounds/Link';

type RequestAttributeProps = { label: string; value: string | number };

export const RequestAttribute = ({ label, value }: RequestAttributeProps) => {
  return (
    <Group spacing="xs" align="flex-start">
      <Text weight="bold" sx={{ color: TextGray }}>
        {label}
      </Text>
      <Text sx={{ maxWidth: rem(500) }}>{value}</Text>
    </Group>
  );
};

type RequestAttributeLinkProps = { label: string; value: string | number; href: string };

export const RequestAttributeLink = ({ label, value, href }: RequestAttributeLinkProps) => {
  return (
    <Group spacing="xs" align="flex-start">
      <Text weight="bold" sx={{ color: TextGray }}>
        {label}
      </Text>
      <Link href={href}>
        <Text variant="link" underline={false} sx={{ maxWidth: rem(500) }}>
          {value}
        </Text>
      </Link>
    </Group>
  );
};
