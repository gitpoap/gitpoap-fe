import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { TextLight, MidnightBlue, ExtraHover, ExtraPressed, TextGray } from '../../../colors';
import { HexagonPath } from './HexagonPath';

type Props = {
  className?: string;
  imgUrl: string;
  disabled?: boolean;
  size: Sizes;
  onClick?: () => void;
};

type Sizes = 'xs' | 'sm' | 'md' | 'lg';

type Dimensions = {
  sm: { width: number; borderSize: number };
  md: { width: number; borderSize: number };
  lg: { width: number; borderSize: number };
};

type HexProps = {
  size: Sizes;
};

const dimensions: Dimensions = {
  xs: { width: 100, borderSize: 2 },
  sm: { width: 150, borderSize: 3 },
  md: { width: 200, borderSize: 4 },
  lg: { width: 350, borderSize: 5 },
};

const Hexagon = styled.div`
  transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;
  clip-path: url('#hexagonPath');

  // Fixes filter path
  overflow: hidden;

  // forces webkit browser visual refresh
  transform: translateZ(0);
`;

const HexBadge = styled(Hexagon)<Props>`
  --s: ${(props) => rem(dimensions[props.size].width)};
  position: absolute;
  top: ${(props) => rem(dimensions[props.size].borderSize)};
  left: ${(props) => rem(dimensions[props.size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  display: inline-block;
  font-size: initial; /* we reset the font-size if we want to add some content */
  background: no-repeat center / 100% url('${(props) => props.imgUrl}');
`;

const HexOuterBorder = styled(Hexagon)<HexProps & { disabled?: boolean }>`
  position: relative;
  --s: ${(props) => rem(dimensions[props.size].width + 4 * dimensions[props.size].borderSize)};
  width: var(--s);
  height: calc(var(--s) * 1);
  cursor: pointer;
  background-color: ${TextLight};

  &:hover:not([disabled]) {
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
`;

const HexInnerBorder = styled(Hexagon)<HexProps>`
  --s: ${(props) => rem(dimensions[props.size].width + 2 * dimensions[props.size].borderSize)};
  position: absolute;
  top: ${(props) => rem(dimensions[props.size].borderSize)};
  left: ${(props) => rem(dimensions[props.size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  background: ${MidnightBlue};
`;

export const GitPOAPBadge = ({ className, imgUrl, disabled, size, onClick }: Props) => {
  return (
    <>
      <HexOuterBorder className={className} size={size} disabled={disabled} onClick={onClick}>
        <HexInnerBorder size={size}>
          <HexBadge imgUrl={imgUrl} size={size} />
        </HexInnerBorder>
      </HexOuterBorder>
      <HexagonPath />
    </>
  );
};
