import styled from 'styled-components';
import { rem } from 'polished';
import { RepoList } from './RepoList';

export const OrgList = styled(RepoList)`
  grid-template-columns: repeat(auto-fill, ${rem(260)});

  @media (max-width: ${rem(800)}) {
    grid-template-columns: unset;
  }
`;
