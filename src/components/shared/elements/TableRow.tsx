import styled from 'styled-components';
import { BackgroundPanel } from '../../../colors';

const TableRow = styled.tr<{ active?: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: ${BackgroundPanel} !important;
  }
  ${({ active }) => active && `background-color: ${BackgroundPanel}`}
`;

export { TableRow };
