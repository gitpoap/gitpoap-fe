import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Text, TextProps } from '@mantine/core';
import { ExtraHover, ExtraPressed, TextAccent, TextDarkGray } from '../../../colors';
import { Link } from '../compounds/Link';

export const TitleStyles = css`
  display: inline-block;
  font-family: 'PT Mono', monospace;
  font-weight: 700;
  font-size: ${rem(13)};
  line-height: ${rem(17)};
  letter-spacing: ${rem(0.5)};
  text-align: center;
  color: ${TextAccent};
  transition: color 150ms ease-in-out;
  cursor: pointer;
`;

const TitleHoverStyles = css`
  &:hover:not([disabled]) {
    color: ${ExtraHover};
  }
  &:active:not([disabled]) {
    color: ${ExtraPressed};
  }
  &[disabled] {
    color: ${TextDarkGray};
    cursor: not-allowed;
  }
`;

export const TitleNoHover = styled(Text)<TextProps & React.ComponentPropsWithoutRef<'span'>>`
  ${TitleStyles};
  color: ${TextAccent};
`;

export const Title = styled(TitleNoHover)`
  ${TitleHoverStyles}
`;

export const TitleLink = styled(Link)`
  ${TitleStyles};
  ${TitleHoverStyles};
  color: ${TextAccent};
`;
