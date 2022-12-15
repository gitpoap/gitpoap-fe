import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { ExtraHover, ExtraPressed, TextDarkGray, TextGray } from '../../../colors';
import { Link } from '../compounds/Link';
import { BREAKPOINTS } from '../../../constants';

export const LinkHoverStyles = css`
  transition: 150ms color ease;

  > * {
    transition: 150ms color ease;
  }

  &:hover:not([disabled]) {
    color: ${ExtraHover};
    > * {
      color: ${ExtraHover};
    }
  }
  &:active:not([disabled]) {
    color: ${ExtraPressed};
    > * {
      color: ${ExtraPressed};
    }
  }
  &[disabled] {
    color: ${TextDarkGray};
    > * {
      color: ${TextDarkGray};
    }
  }
`;

export const LinkStyles = css`
  font-size: ${rem(12)};
  font-weight: 700;
  letter-spacing: ${rem(2)};
  text-transform: uppercase;
  color: ${TextGray};
  transition: 150ms color ease;

  > * {
    color: ${TextGray};
    transition: 150ms color ease;
  }

  ${LinkHoverStyles}
`;

const StyledLink = styled(Link)`
  ${LinkStyles}
  margin-right: ${rem(18)};
  @media (max-width: ${rem(BREAKPOINTS.sm + 40)}) {
    margin-right: ${rem(12)};
  }
`;

type Props = React.ComponentProps<typeof Link>;

export const NavLink = ({ children, href, target, rel, className }: Props) => {
  return (
    <StyledLink passHref href={href} className={className} target={target} rel={rel}>
      {children}
    </StyledLink>
  );
};
