import { Container } from '@mantine/core';
import styled from 'styled-components';

import { ExtraHover, PrimaryBlue } from '../../colors';
import { Text } from '../shared/elements';

export const StyledLink = styled.a`
  color: ${PrimaryBlue};
  &:hover {
    text-decoration: underline;
    &:not(:active) {
      color: ${ExtraHover};
    }
  }
`;

type Props = {
  queueNumber: number;
};

export const Completed = ({ queueNumber }: Props) => (
  <Container mt="xl">
    <Text>
      {`Thank you you're #${queueNumber} in the queue. If you'd like to get in touch sooner, shoot an email over to `}
      <StyledLink href="mailto:team@gitpoap.io">team@gitpoap.io</StyledLink>
    </Text>
  </Container>
);
