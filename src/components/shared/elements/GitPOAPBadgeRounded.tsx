import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { TextLight, MidnightBlue, ExtraHover, ExtraPressed, TextGray } from '../../../colors';

type Props = {
  className?: string;
  imgUrl: string;
  disabled?: boolean;
  size: Sizes;
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

const Hexagon = styled.div`
  /* transition: 150ms background-color ease-in-out, 150ms opacity ease-in-out;
  clip-path: polygon(5% 25%, 50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%); */
`;

const HexBadgeInner = styled.div`
  transform: skewX(-30deg) rotate(60deg) skewX(30deg);
  opacity: 0.8;
  transition: 150ms opacity ease;
  cursor: pointer;

  &:hover:not([disabled]) {
    opacity: 1;
  }
`;

const HexBadgeInnerContent = styled.div<{ imgUrl: string }>`
  transform: skewX(-30deg) rotate(60deg) skewX(30deg);
  background: orange;

  &:before {
    top: 0;
    height: ${rem(300)} !important;
    /* margin-top: -50px; */
    transform: skewX(-30deg) rotate(-90deg);
    background: url('${(props) => props.imgUrl}') no-repeat center center;
    background-size: cover;
    content: '';
  }
`;

const HexBadge = styled(Hexagon)<Props>`
  overflow: hidden;
  display: inline-block;
  width: 20em;
  height: 17.32em;
  transform: rotate(-30deg) skewX(30deg);
  border-radius: ${rem(6)};

  *,
  *:before {
    display: block;
    overflow: hidden;
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }

  /* &::first-child ${HexBadgeInner}:before, ${HexBadgeInnerContent} {
    transform: skewX(-30deg) rotate(60deg) skewX(30deg);
    background: orange;
    content: '';
  } */
`;

// const HexOuterBorder = styled(Hexagon)<HexProps & { disabled?: boolean }>`
//   position: relative;
//   --s: ${(props) => rem(dimensions[props.size].width + 4 * dimensions[props.size].borderSize)};
//   width: var(--s);
//   height: calc(var(--s) * 1);
//   background-color: ${TextLight};
//   cursor: pointer;

//   &:hover:not([disabled]) {
//     background-color: ${ExtraHover};
//     ${HexBadge} {
//       opacity: 0.7;
//     }
//   }
//   &:active:not([disabled]) {
//     background-color: ${ExtraPressed};
//     ${HexBadge} {
//       opacity: 0.5;
//     }
//   }
//   &[disabled] {
//     cursor: not-allowed;
//     background-color: ${TextGray};
//     ${HexBadge} {
//       background: ${MidnightBlue};
//     }
//   }
// `;

// const HexInnerBorder = styled(Hexagon)<HexProps>`
//   --s: ${(props) => rem(dimensions[props.size].width + 2 * dimensions[props.size].borderSize)};
//   position: absolute;
//   top: ${(props) => rem(dimensions[props.size].borderSize)};
//   left: ${(props) => rem(dimensions[props.size].borderSize)};

//   width: var(--s);
//   height: calc(var(--s) * 1);
//   background: ${MidnightBlue};
// `;

export const GitPOAPBadgeRounded = ({ className, imgUrl, disabled, size }: Props) => {
  return (
    <HexBadge imgUrl={imgUrl} size={size}>
      <HexBadgeInner>
        <HexBadgeInnerContent imgUrl={imgUrl}></HexBadgeInnerContent>
      </HexBadgeInner>
    </HexBadge>
  );
};

/* Another option is to use SVG ~ https://stackoverflow.com/questions/67458234/mask-image-with-svg-shape-and-add-a-border*/
