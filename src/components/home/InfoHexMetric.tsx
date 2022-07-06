import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../colors';
import { InfoHexBase } from '../shared/elements/InfoHexBase';
import { TextSkeleton } from '../shared/elements';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${rem(190)};
`;

const Icon = styled.div`
  margin-bottom: ${rem(25)};
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
`;

const Rate = styled.div`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(12)};
  line-height: ${rem(16)};
  text-align: center;
  letter-spacing: ${rem(-0.1)};
  color: ${TextLight};
`;

const RateSkeleton = styled(TextSkeleton)`
  height: ${rem(20)};
  text-align: center;
`;

type Props = {
  value: string | null;
  rate: string | null;
  unit: string;
  icon: React.ReactNode;
  className?: string;
  href?: string;
};

export const InfoHexMetric = ({ className, rate, value, unit, icon, href }: Props) => {
  return (
    <InfoHexBase className={className} href={href} hoverEffects={!!href}>
      <Content>
        <Icon>{icon}</Icon>
        {value ? <Value>{value}</Value> : <ValueSkeleton width={rem(100)} />}
        <Unit>{unit}</Unit>
        {/* {rate ? <Rate>{rate}</Rate> : <RateSkeleton width={rem(50)} />} */}
      </Content>
    </InfoHexBase>
  );
};
