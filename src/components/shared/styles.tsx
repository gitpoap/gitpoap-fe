import { css } from 'styled-components';
import { rem } from 'polished';

export const textEllipses = (maxWidth: number) => css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${rem(maxWidth)};
`;
