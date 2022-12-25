import styled from 'styled-components';
import NextLink from 'next/link';
import { IconStyles, IconStylesHover } from '../elements/icons';
import { trackLink } from '../../../lib/tracking/events';

type Props = React.ComponentProps<typeof NextLink>;

export const Link = (props: Props) => {
  const { children, className, ...restProps } = props;

  return (
    <NextLink
      {...restProps}
      className={className}
      target={restProps.target}
      rel={restProps.rel}
      onClick={(e) => {
        trackLink(e);
      }}
    >
      {children}
    </NextLink>
  );
};

export const IconLink = styled(Link)`
  ${IconStyles}
  ${IconStylesHover}
`;
