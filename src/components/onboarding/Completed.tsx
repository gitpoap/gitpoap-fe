import { Container } from '@mantine/core';

import { Link } from '../Link';
import { Text } from '../shared/elements';
import { StyledAnchor } from './IntakeForm';

type Props = {
  queueNumber: number;
};

export const Completed = ({ queueNumber }: Props) => (
  <Container mt="xl">
    <Text>
      {`Thank you you're #${queueNumber} in the queue. If you'd like to get in touch sooner, shoot an email over to `}
      <Link href="mailto:team@gitpoap.io">
        <StyledAnchor>team@gitpoap.io</StyledAnchor>
      </Link>
    </Text>
  </Container>
);
