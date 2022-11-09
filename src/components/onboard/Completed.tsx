import { Container, Stack } from '@mantine/core';
import styled from 'styled-components';

import { ExtraHover, PrimaryBlue } from '../../colors';
import { Header, Text } from '../shared/elements';

export const StyledLink = styled.a`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
  cursor: pointer;
`;

const ActionText = styled(Text)`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
  cursor: pointer;
  display: inline-block;
`;

type Props = {
  queueNumber: number;
  resetForm: () => void;
};

export const Completed = ({ resetForm }: Props) => (
  <Container mt="sm">
    <Stack spacing="xl">
      <Header>Thank you!</Header>
      <Text>{`We will get back to you ASAP ⚡️`}</Text>
      <Text>
        {`If you'd like to get in touch sooner, shoot an email over to `}
        <StyledLink href="mailto:team@gitpoap.io">team@gitpoap.io</StyledLink>
      </Text>
      <Text>
        {`Click `}
        <ActionText onClick={resetForm}>here</ActionText>
        {` to submit another set of repos`}
      </Text>
    </Stack>
  </Container>
);
