import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TextGray, ExtraHover, ExtraPressed } from '../../../../colors';

export const IconStyles = css`
  text-decoration: none;
  transition: 200ms fill ease, 200ms stroke ease;
  height: ${rem(18)};
  width: ${rem(18)};

  path {
    transition: 200ms fill ease;
    fill: ${TextGray};
  }
`;

export const IconStylesHover = css`
  &:hover {
    cursor: pointer;

    path {
      fill: ${ExtraHover};
    }
  }
  &:active {
    path {
      fill: ${ExtraPressed};
    }
  }
`;

export const Icon = styled.svg`
  ${IconStyles}
`;
