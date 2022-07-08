import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Image from 'next/image';
import { Title as TitleUI } from '../elements/Title';
import { TextLight } from '../../../colors';
import { FeatureHeart } from '../compounds/FeatureHeart';
import { Link } from '../../Link';

type Props = {
  className?: string;
  imgSrc: string;
  name: string;
  href: string;
  poapTokenId?: string;
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.a`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;

  &:hover:not([disabled]) {
    opacity: 0.7;
    cursor: pointer;
  }
  &:active:not([disabled]) {
    opacity: 0.5;
  }

  /* Prevents the underlying next/image components from being clickable */
  span,
  img {
    pointer-events: none;
  }
`;

const POAP = styled(Image)`
  width: ${rem(150)};
  height: ${rem(150)};
  border-radius: 50%;
  background: #ffffff;
`;

const Title = styled(TitleUI)`
  margin-top: ${rem(10)};
  color: ${TextLight};
  width: ${rem(162)};
`;

const Heart = styled(FeatureHeart)`
  position: absolute;
  bottom: ${rem(0)};
  right: ${rem(0)};
`;

const BadgeContainer = styled(Container)`
  position: relative;
  margin: ${rem(6)} 0;
`;

export const POAPBadge = ({ className, imgSrc, name, href, poapTokenId }: Props) => {
  return (
    <Container className={className}>
      <BadgeContainer>
        <ImgContainer href={href} target="_blank" rel="noopener noreferrer">
          <POAP quality={100} height={150} width={150} src={imgSrc} />
        </ImgContainer>
        {poapTokenId && <Heart poapTokenId={poapTokenId} />}
      </BadgeContainer>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <Title>{name}</Title>
      </Link>
    </Container>
  );
};
