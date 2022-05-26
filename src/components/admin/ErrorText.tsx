import React from 'react';
import styled from 'styled-components';
import { Group, Box } from '@mantine/core';
import { FormErrors } from '@mantine/form';
import { ExtraRed } from '../../colors';
import { rem } from 'polished';
import { Text } from '../shared/elements';

type Props = {
  errors: FormErrors;
};

const ErrorText = styled(Text)`
  color: ${ExtraRed};
  font-size: ${rem(11)};
`;

export const Errors = ({ errors }: Props) => {
  return (
    <>
      {Object.keys(errors).length > 0 && (
        <Group style={{ marginBottom: rem(20) }}>
          <Box>
            {Object.keys(errors).map((errorKey, i) => {
              return <ErrorText key={i}>{`${errorKey}: ${errors[errorKey]}`}</ErrorText>;
            })}
          </Box>
        </Group>
      )}
    </>
  );
};
