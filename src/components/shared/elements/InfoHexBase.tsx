import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel, BackgroundPanel2 } from '../../../colors';
import { Link } from '../compounds/Link';

type Props = {
  children: React.ReactNode;
  className?: string;
  hoverEffects?: boolean;
  href?: string;
  onClick?: () => void;
};

const BodyStyles = css<{ hoverEffects?: boolean }>`
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
  background-color: ${BackgroundPanel};
  position: relative;
  min-height: ${rem(100)};
  transition: 150ms background-color ease;
  pointer-events: auto;
  &:before {
    position: absolute;
    content: '';
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    width: 100%;
    height: ${rem(50)};
    background-color: ${BackgroundPanel};
    top: ${rem(-49.5)};
    transition: 150ms background-color ease;
    left: 0;
  }
  &:after {
    content: '';
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    position: absolute;
    width: 100%;
    height: ${rem(50)};
    background-color: ${BackgroundPanel};
    bottom: ${rem(-50)};
    transition: 150ms background-color ease;
    left: 0;
  }

  ${(props) =>
    props.hoverEffects &&
    `
      &:hover {
        background-color: ${BackgroundPanel2};
        cursor: pointer;
        &::before,
        &::after {
          background-color: ${BackgroundPanel2};
        }
      }

      &:active {
        background-color: ${BackgroundPanel};
        cursor: pointer;
        &::before,
        &::after {
          background-color: ${BackgroundPanel};
        }
      }
  `}
`;

export const Body = styled.div<{ hoverEffects?: boolean }>`
  ${BodyStyles}
`;

export const BodyAsAnchor = styled(Link)<{ href?: string; hoverEffects?: boolean }>`
  ${BodyStyles}
`;

export const Hex = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: ${rem(250)};
  pointer-events: none;
`;

export const InfoHexBase = React.forwardRef(
  ({ className, children, hoverEffects, href, onClick, ...props }: Props, ref) => {
    if (href) {
      return (
        <Hex className={className} {...props}>
          <Body onClick={onClick} hoverEffects={hoverEffects}>
            <Link href={href} passHref>
              {children}
            </Link>
          </Body>
        </Hex>
      );
    }

    return (
      <Hex className={className} {...props}>
        <Body hoverEffects={hoverEffects} onClick={onClick}>
          {children}
        </Body>
      </Hex>
    );
  },
);
