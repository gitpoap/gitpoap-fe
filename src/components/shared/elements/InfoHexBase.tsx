import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel, BackgroundPanel2 } from '../../../colors';
import { Link } from '../../Link';

type Props = {
  children: React.ReactNode;
  className?: string;
  hoverEffects?: boolean;
  href?: string;
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
  ({ className, children, hoverEffects, href, ...props }: Props, ref) => {
    if (href) {
      return (
        <Hex className={className} {...props}>
          <BodyAsAnchor href={href} hoverEffects={hoverEffects}>
            {children}
          </BodyAsAnchor>
        </Hex>
      );
    }

    return (
      <Hex className={className} {...props}>
        <Body hoverEffects={hoverEffects}>{children}</Body>
      </Hex>
    );
  },
);
