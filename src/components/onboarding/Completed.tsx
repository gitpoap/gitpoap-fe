import { Container } from '@mantine/core';

import { Text } from '../shared/elements';

export const Completed = () => (
  <Container mt="xl">
    <Text>
      {
        'Thank you you’re #X in the queue. If you’d like to get in touch sooner, shoot an email over to team@gitpoap.io'
      }
    </Text>
  </Container>
);
