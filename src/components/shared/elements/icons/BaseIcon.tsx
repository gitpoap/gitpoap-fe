import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TextGray, ExtraHover, ExtraPressed } from '../../../../colors';

export const IconStyles = css`
  text-decoration: none;
  transition: 200ms fill ease, 200ms stroke ease, 200ms color ease;
  height: ${rem(18)};
  width: ${rem(18)};
  color: ${TextGray};

  path {
    transition: 200ms fill ease;
  }
`;

export const IconStylesHover = css`
  &:hover {
    cursor: pointer;
    color: ${ExtraHover};
    path {
      fill: ${ExtraHover};
    }
  }
  &:active {
    color: ${ExtraPressed};
    path {
      fill: ${ExtraPressed};
    }
  }
`;

export const Icon = styled.svg`
  ${IconStyles}
`;
