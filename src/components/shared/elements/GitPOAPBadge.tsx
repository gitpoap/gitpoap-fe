import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { TextLight, MidnightBlue, ExtraHover, ExtraPressed, TextGray } from '../../../colors';

type Props = {
  className?: string;
  imgUrl: string;
  disabled?: boolean;
  size: Sizes;
  onClick?: () => void;
};

type Sizes = 'sm' | 'md' | 'lg';

type Dimensions = {
  sm: { width: number; borderSize: number };
  md: { width: number; borderSize: number };
  lg: { width: number; borderSize: number };
};

type HexProps = {
  size: Sizes;
};

const dimensions: Dimensions = {
  sm: { width: 150, borderSize: 3 },
  md: { width: 200, borderSize: 4 },
  lg: { width: 324, borderSize: 5 },
};

const HEIGHT_RATIO = 1.0467;

const Hexagon = styled.div`
  transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;
  clip-path: url(#myPath);
`;

const HexBadge = styled(Hexagon)<Props>`
  --s: ${(props) => rem(dimensions[props.size].width)};
  position: absolute;
  top: ${(props) => rem(dimensions[props.size].borderSize)};
  left: ${(props) => rem(dimensions[props.size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * ${HEIGHT_RATIO});
  display: inline-block;
  font-size: initial; /* we reset the font-size if we want to add some content */
  background: url('${(props) => props.imgUrl}') no-repeat center center;
  background-size: cover;
`;

const HexOuterBorder = styled(Hexagon)<HexProps & { disabled?: boolean }>`
  position: relative;
  --s: ${(props) => rem(dimensions[props.size].width + 4 * dimensions[props.size].borderSize)};
  width: var(--s);
  height: calc(var(--s) * ${HEIGHT_RATIO});
  background-color: ${TextLight};
  cursor: pointer;

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
    ${HexBadge} {
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
  height: calc(var(--s) * ${HEIGHT_RATIO});
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
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <clipPath id="myPath" clipPathUnits="objectBoundingBox">
          <path d="m0.902,0.185 l-0.287,-0.157 a0.221,0.21,0,0,0,-0.214,-0.002 l-0.282,0.142 a0.221,0.21,0,0,0,-0.115,0.184 l-0.002,0.294 a0.219,0.208,0,0,0,0.112,0.181 l0.278,0.149 a0.216,0.205,0,0,0,0.207,0 l0.29,-0.149 a0.211,0.2,0,0,0,0.11,-0.174 l0.002,-0.304 a0.197,0.187,0,0,0,-0.1,-0.165" />
        </clipPath>
      </svg>
    </>
  );
};
