import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Badge } from '../elements/Badge';
import { TitleNoHover } from '../elements/Title';
import { TextAccent } from '../../../colors';
import { IconCount } from '../elements/IconCount';
import { GitPOAP, People, Star } from '../../shared/elements/icons';
import { textEllipses } from '../styles';
import { ExtraHover, ExtraPressed } from '../../../colors';
import { Body, BodyAsAnchor, InfoHexBase } from '../../shared/elements/InfoHexBase';
import { BREAKPOINTS } from '../../../constants';

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > *:not(:last-child) {
    margin-right: ${rem(10)};
  }
`;

const TitleStyled = styled(TitleNoHover)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(15)};
  line-height: ${rem(24)};
  text-align: center;
  letter-spacing: ${rem(0.2)};
  color: ${TextAccent};
  ${textEllipses(170)};
`;

const BadgeStyled = styled(Badge)`
  margin-top: ${rem(7)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${rem(15)} ${rem(20)};
`;

const RepoName = styled(TitleNoHover)`
  font-size: ${rem(20)};
  line-height: ${rem(26)};
  ${textEllipses(230)}
`;

const BODY_HEIGHT = 10;

const InfoHexBaseStyled = styled(InfoHexBase)`
  width: ${rem(200)};
  min-width: ${rem(200)};

  ${Body}, ${BodyAsAnchor} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${rem(BODY_HEIGHT)};
    margin-bottom: ${rem(BODY_HEIGHT)};
    min-height: unset;

    &:before {
      height: ${rem(BODY_HEIGHT)};
      top: ${rem(-BODY_HEIGHT)};
    }
    &:after {
      height: ${rem(BODY_HEIGHT)};
      bottom: ${rem(-BODY_HEIGHT)};
    }

    &:hover {
      ${RepoName} {
        color: ${ExtraHover};
      }
    }

    &:active {
      ${RepoName} {
        color: ${ExtraPressed};
      }
    }
  }

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    width: ${rem(180)};
    min-width: ${rem(180)};
  }
`;

type Props = {
  className?: string;
  orgName: string;
  name: string;
  memberCount?: number;
  gitPoapCount?: number;
  stars?: number;
};

export const RepoHexSmall = ({
  orgName,
  name,
  memberCount,
  gitPoapCount,
  stars,
  className,
}: Props) => {
  return (
    <InfoHexBaseStyled className={className} href={`/gh/${orgName}/${name}`} hoverEffects>
      <Content>
        <TitleStyled>{name}</TitleStyled>
        <Icons>
          {memberCount && (
            <IconCount count={memberCount} icon={<People width="13" height="11" />} />
          )}
          {gitPoapCount && (
            <IconCount count={gitPoapCount} icon={<GitPOAP width="14" height="12" />} />
          )}
          {stars && <IconCount count={stars} icon={<Star width="13" height="11" />} />}
        </Icons>
        <BadgeStyled>{orgName}</BadgeStyled>
      </Content>
    </InfoHexBaseStyled>
  );
};