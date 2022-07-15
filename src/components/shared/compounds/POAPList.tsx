import styled from 'styled-components';
import { rem } from 'polished';
import { BREAKPOINTS } from '../../../constants';

export const POAPList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, ${rem(160)});
  column-gap: ${rem(40)};
  row-gap: ${rem(30)};
  align-items: flex-start;
  margin-bottom: ${rem(50)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 48%);
    justify-content: center;
    column-gap: 4%;
    row-gap: ${rem(30)};
    margin-top: ${rem(30)};
  }
`;
