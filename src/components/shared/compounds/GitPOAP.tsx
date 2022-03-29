import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { GitPOAPBadge } from '../elements/GitPOAPBadge';
import { Title } from '../elements/Title';
import { TextLight } from '../../../colors';
import { FeatureHeart } from './FeatureHeart';

type Props = {
  imgSrc: string;
  name: string;
  orgName: string;
  description?: string;
  className?: string;
  poapTokenId?: string;
};

const LineClamp = (lines: number) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${rem(150)};
`;

const TitleStyled = styled(Title)`
  margin-top: ${rem(10)};
  text-align: center;
  ${LineClamp(2)};
`;

const OrgName = styled.div`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  text-align: center;
  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  color: ${TextLight};
  margin-top: ${rem(8)};
`;

const Description = styled.div`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(11)};
  line-height: ${rem(14)};
  text-align: center;
  letter-spacing: ${rem(-0.1)};
  color: ${TextLight};
  margin-top: ${rem(8)};
  ${LineClamp(3)};
`;

const Heart = styled(FeatureHeart)`
  position: absolute;
  bottom: ${rem(0)};
  right: ${rem(10)};
`;

const BadgeWrapper = styled(Wrapper)`
  position: relative;
`;

export const GitPOAP = ({ className, poapTokenId, imgSrc, name, orgName, description }: Props) => {
  return (
    <Wrapper className={className}>
      <BadgeWrapper>
        <GitPOAPBadge size="sm" imgUrl={imgSrc} />
        {poapTokenId && <Heart poapTokenId={poapTokenId} />}
      </BadgeWrapper>
      <Info>
        <TitleStyled>{name}</TitleStyled>
        <OrgName>{orgName}</OrgName>
        {description && <Description>{description}</Description>}
      </Info>
    </Wrapper>
  );
};
