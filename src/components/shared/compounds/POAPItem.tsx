import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import ImageUI from 'next/image';

type Props = {
  poap: POAP;
};

export type POAP = {
  created: string;
  owner: string;
  tokenId: string;
  event: {
    city: string;
    country: string;
    description: string;
    end_date: string;
    event_url: string;
    expiry_date: string;
    fancy_id: string;
    id: number;
    image_url: string;
    name: string;
    start_date: string;
    supply: number;
    year: number;
  };
};

const Container = styled.div`
  padding: ${rem(10)};
`;

const Image = styled(ImageUI)`
  border-radius: 50%;
`;

export const POAPItem = (props: Props) => {
  const { poap } = props;
  return (
    <Container>
      <Image height={180} width={180} src={poap.event.image_url} alt={poap.event.description} />
    </Container>
  );
};
