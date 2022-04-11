import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../colors';
import { InfoHexBase } from '../shared/elements/InfoHexBase';

type Props = {
  value: string;
  rate: string;
  unit: string;
  icon: React.ReactNode;
  className?: string;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${rem(190)};
`;

const Icon = styled.div`
  margin-bottom: ${rem(25)};
  svg:hover {
    cursor: default;
  }
`;

const Value = styled.div`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  text-align: center;
  letter-spacing: ${rem(-1)};
  color: ${TextLight};
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

export const InfoHexMetric = ({ className, rate, value, unit, icon }: Props) => {
  return (
    <InfoHexBase className={className}>
      <Content>
        <Icon>{icon}</Icon>
        <Value>{value}</Value>
        <Unit>{unit}</Unit>
        {/* <Rate>{rate}</Rate> */}
      </Content>
    </InfoHexBase>
  );
};
