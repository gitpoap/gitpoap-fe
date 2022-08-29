import styled from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../../colors';

type Props = {
  icon: React.ReactNode;
  count: number;
};

const Count = styled.span`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
  text-transform: uppercase;
  color: ${TextLight};
  margin-left: ${rem(6)};
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  path {
    transition: 200ms fill ease;
    fill: ${TextGray};
  }
`;

export const IconCount = ({ icon, count }: Props) => {
  return (
    <Container>
      {icon}
      <Count>{count}</Count>
    </Container>
  );
};
