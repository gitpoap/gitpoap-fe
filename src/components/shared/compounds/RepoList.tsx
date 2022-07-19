import styled from 'styled-components';
import { rem } from 'polished';
import { BREAKPOINTS } from '../../../constants';

export const RepoList = styled.div`
  display: grid;
  width: 100%;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(55)};

  justify-content: center;
  align-content: center;
  align-items: flex-start;

  grid-template-columns: repeat(auto-fill, ${rem(280)});
  column-gap: ${rem(30)};
  row-gap: ${rem(32)};

  @media (max-width: ${rem(800)}) {
    grid-template-columns: repeat(auto-fit, minmax(${rem(250)}, 1fr));
  }
`;

export const RepoListSmall = styled.div`
  display: grid;
  width: 100%;
  margin-top: ${rem(50)};
  margin-bottom: ${rem(55)};

  grid-template-columns: repeat(auto-fit, ${rem(200)});
  column-gap: ${rem(40)};
  row-gap: ${rem(35)};

  @media (max-width: ${rem(750)}) {
    column-gap: 5%;
    grid-template-columns: repeat(auto-fit, 30%);
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    column-gap: 4%;
    grid-template-columns: repeat(auto-fit, 48%);
  }
`;
