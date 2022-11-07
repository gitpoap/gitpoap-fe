import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../colors';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { BREAKPOINTS } from '../../constants';
import { TextSkeleton } from '../shared/elements';
import { textEllipses } from '../shared/styles';
import { Stack } from '@mantine/core';

const Content = styled(Stack)`
  height: ${rem(190)};
  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: unset;
  }
`;

const Icon = styled.div`
  margin-bottom: ${rem(25)};
  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-bottom: unset;
    svg {
      height: ${rem(48)} !important;
      width: ${rem(48)} !important;
    }
  }
`;

const Value = styled.div`
  font-family: VT323;
  font-weight: normal;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextLight};
  margin-bottom: ${rem(4)};
`;

const ValueSkeleton = styled(TextSkeleton)`
  height: ${rem(42)};
  text-align: center;
  margin-bottom: ${rem(4)};
`;

const Unit = styled.div`
  font-family: PT Mono, monospace;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(15)};
  line-height: ${rem(18)};
  text-align: center;
  letter-spacing: ${rem(-0.5)};
  color: ${TextGray};
  margin-bottom: ${rem(20)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    ${textEllipses(85)}
  }
`;

type Props = {
  value: string | null;
  unit: string;
  icon: React.ReactNode;
  className?: string;
  href?: string;
};

export const InfoHexMetric = ({ className, value, unit, icon, href }: Props) => {
  return (
    <InfoHexBase className={className} href={href} hoverEffects={!!href}>
      <Content align="center" justify="center" spacing={0}>
        <Icon>{icon}</Icon>
        {value ? <Value>{value}</Value> : <ValueSkeleton width={rem(100)} />}
        <Unit>{unit}</Unit>
      </Content>
    </InfoHexBase>
  );
};
