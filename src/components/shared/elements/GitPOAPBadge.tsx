import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import {
  TextLight,
  MidnightBlue,
  ExtraHover,
  ExtraPressed,
  TextGray,
  BackgroundPanel2,
} from '../../../colors';
import { HexagonPath } from './HexagonPath';
import Image from 'next/image';
import { Link } from '../compounds/Link';
import { Level } from '../../../types';

type Props = {
  className?: string;
  imgUrl: string;
  altText: string;
  disabled?: boolean;
  size: Sizes;
  onClick?: () => void;
  disableHoverEffects?: boolean;
  href?: string;
  level?: Level;
};

export type Sizes = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

type Dimensions = {
  [size in Sizes]: { width: number; borderSize: number };
};

type HexProps = {
  size: Sizes;
  level?: Level;
};

const dimensions: Dimensions = {
  xxxs: { width: 30, borderSize: 2 },
  xxs: { width: 50, borderSize: 2 },
  xs: { width: 100, borderSize: 2 },
  sm: { width: 150, borderSize: 3 },
  md: { width: 200, borderSize: 4 },
  lg: { width: 350, borderSize: 5 },
};

const dimensionsLevels: Dimensions = {
  xxxs: { width: 30, borderSize: 3 },
  xxs: { width: 50, borderSize: 4 },
  xs: { width: 100, borderSize: 5 },
  sm: { width: 150, borderSize: 6 },
  md: { width: 200, borderSize: 7 },
  lg: { width: 350, borderSize: 8 },
};

export const HexagonStyles = css`
  transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;
  clip-path: url('#hexagonPath');

  /* Fixes filter path */
  overflow: hidden;

  /* Forces webkit browser visual refresh */
  transform: translateZ(0);
`;

const Hexagon = styled.div`
  ${HexagonStyles}
`;

const HexagonLink = styled(Link)`
  ${HexagonStyles}
`;

const HexBadge = styled(Hexagon)<Pick<Props, 'imgUrl' | 'level' | 'size'>>`
  --s: ${(props) => rem(dimensions[props.size].width)};
  position: absolute;
  top: ${({ level, size }) =>
    rem(level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize)};
  left: ${({ level, size }) =>
    rem(level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  display: inline-block;
  font-size: initial; /* we reset the font-size if we want to add some content */
  background: ${BackgroundPanel2};
`;

type HexOuterBorderProps = HexProps & { disabled?: boolean; disableHoverEffects?: boolean };

const handleBorderColor = (level?: Level) => {
  switch (level) {
    case 'bronze':
      return 'linear-gradient(to bottom, #6A3805, #AD8A56, #6A3805)';
    case 'silver':
      return 'linear-gradient(to bottom, #7a7a7a, #e6e6e6, #7a7a7a)';
    case 'gold':
      return 'linear-gradient(to bottom, #b28c10, #eedfaf, #b28c10)';
    default:
      return TextLight;
  }
};

const HexOuterBorder = styled(Hexagon)<HexOuterBorderProps>`
  position: relative;
  --s: ${({ level, size }) =>
    rem(
      dimensions[size].width +
        4 * (level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize),
    )};
  width: var(--s);
  height: calc(var(--s) * 1);

  background: ${({ level }) => handleBorderColor(level)};

  ${(props) =>
    !props.disableHoverEffects &&
    css`
      &:hover:not([disabled]) {
        cursor: pointer;
        background-color: ${ExtraHover};
        ${HexBadge} {
          opacity: 0.7;
        }
      }
      &:active:not([disabled]) {
        background-color: ${ExtraPressed};
        ${HexBadge} {
          opacity: 0.5;
        }
      }
      &[disabled] {
        cursor: not-allowed;
        background-color: ${TextGray};
        ${HexBadge}:before {
          background: ${MidnightBlue};
        }
      }
    `}
`;

const HexInnerBorder = styled(Hexagon)<HexProps>`
  --s: ${({ level, size }) =>
    rem(
      dimensions[size].width +
        2 * (level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize),
    )};
  position: absolute;
  top: ${({ level, size }) =>
    rem(level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize)};
  left: ${({ level, size }) =>
    rem(level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  background: ${MidnightBlue};
`;

const HexLink = styled(HexagonLink)<HexProps>`
  --s: ${({ level, size }) =>
    rem(
      dimensions[size].width +
        4 * (level ? dimensionsLevels[size].borderSize : dimensions[size].borderSize),
    )};
  width: var(--s);
  height: calc(var(--s) * 1);
`;

export const GitPOAPBadge = ({
  className,
  imgUrl,
  altText,
  disabled,
  size,
  onClick,
  disableHoverEffects,
  href,
  level,
}: Props) => {
  const badgeCore = (
    <>
      <HexOuterBorder
        className={className}
        size={size}
        disabled={disabled}
        onClick={onClick}
        disableHoverEffects={disableHoverEffects}
        level={level}
      >
        <HexInnerBorder level={level} size={size}>
          <HexBadge imgUrl={imgUrl} level={level} size={size}>
            <Image alt={altText} layout="fill" src={imgUrl} />
          </HexBadge>
        </HexInnerBorder>
      </HexOuterBorder>
      <HexagonPath />
    </>
  );

  if (href) {
    return (
      <>
        <HexLink href={href} passHref level={level} size={size}>
          {badgeCore}
        </HexLink>
      </>
    );
  }

  return <>{badgeCore}</>;
};
