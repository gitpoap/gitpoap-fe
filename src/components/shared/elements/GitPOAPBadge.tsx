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
  stdDeviation?: number;
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
  lg: { width: 350, borderSize: 5 },
};

const RoundedHexagon = styled.div`
  transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;
  clip-path: polygon(5% 25%, 50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%);
  filter: url(#round);

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    clip-path: inherit;
    transition: inherit;
  }
`;

const RoundedHexBadge = styled(RoundedHexagon)<Props>`
  --s: ${(props) => rem(dimensions[props.size].width)};
  position: absolute;
  top: ${(props) => rem(dimensions[props.size].borderSize)};
  left: ${(props) => rem(dimensions[props.size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  display: inline-block;
  font-size: initial; /* we reset the font-size if we want to add some content */

  &:before {
    background: no-repeat center / cover url('${(props) => props.imgUrl}');
    background-size: 100% 100%;
  }
`;

const RoundedHexOuterBorder = styled(RoundedHexagon)<HexProps & { disabled?: boolean }>`
  position: relative;
  --s: ${(props) => rem(dimensions[props.size].width + 4 * dimensions[props.size].borderSize)};
  width: var(--s);
  height: calc(var(--s) * 1);
  cursor: pointer;

  &:before {
    background-color: ${TextLight};
  }

  &:hover:not([disabled]) {
    &:before {
      background-color: ${ExtraHover};
    }
    ${RoundedHexBadge} {
      opacity: 0.7;
    }
  }
  &:active:not([disabled]) {
    &:before {
      background-color: ${ExtraPressed};
    }
    ${RoundedHexBadge} {
      opacity: 0.5;
    }
  }
  &[disabled] {
    &:before {
      cursor: not-allowed;
      background-color: ${TextGray};
    }
    ${RoundedHexBadge} {
      background: ${MidnightBlue};
    }
  }
`;

const RoundedHexInnerBorder = styled(RoundedHexagon)<HexProps>`
  --s: ${(props) => rem(dimensions[props.size].width + 2 * dimensions[props.size].borderSize)};
  position: absolute;
  top: ${(props) => rem(dimensions[props.size].borderSize)};
  left: ${(props) => rem(dimensions[props.size].borderSize)};

  width: var(--s);
  height: calc(var(--s) * 1);
  &:before {
    background: ${MidnightBlue};
  }
`;

export const GitPOAPBadge = ({
  className,
  imgUrl,
  disabled,
  size,
  onClick,
  stdDeviation,
}: Props) => {
  return (
    <>
      <RoundedHexOuterBorder
        className={className}
        size={size}
        disabled={disabled}
        onClick={onClick}
      >
        <RoundedHexInnerBorder size={size}>
          <RoundedHexBadge imgUrl={imgUrl} size={size} />
        </RoundedHexInnerBorder>
      </RoundedHexOuterBorder>
      <svg
        style={{ visibility: 'hidden', position: 'absolute' }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation={stdDeviation ?? '8'} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};
