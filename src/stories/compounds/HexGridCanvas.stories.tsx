import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GitPOAP } from '../../components/shared/compounds/GitPOAP';
import { gitPOAPs } from '../data';
import { GitPOAPBadge } from '../../components/shared/elements/GitPOAPBadge';

import real_badge1 from '../assets/gitPOAPs/real_badge1.png';
import real_badge2 from '../assets/gitPOAPs/real_badge2.png';
import real_badge3 from '../assets/gitPOAPs/real_badge3.png';
import real_badge4 from '../assets/gitPOAPs/real_badge4.png';
import real_badge5 from '../assets/gitPOAPs/real_badge5.png';
import real_badge6 from '../assets/gitPOAPs/real_badge6.png';
import real_badge7 from '../assets/gitPOAPs/real_badge7.png';
import real_badge8 from '../assets/gitPOAPs/real_badge8.png';
import real_badge9 from '../assets/gitPOAPs/real_badge9.png';
import real_badge10 from '../assets/gitPOAPs/real_badge10.png';
import real_badge11 from '../assets/gitPOAPs/real_badge11.png';
import real_badge12 from '../assets/gitPOAPs/real_badge12.png';

const Main = styled.div`
  display: flex;
  --s: 100px; /* size  */
  --m: 4px; /* margin */
  --f: calc(var(--s) * 1.732 + 4 * var(--m) - 1px);
  width: ${rem(1350)};
`;

const Container = styled.div`
  font-size: 0; /* disable white space between inline block element */

  &::before {
    content: '';
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 120%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
  }
`;

const Hex = styled.div<{ featured: boolean; imgUrl?: string }>`
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);

  text-align: center;
  line-height: calc(var(--s) * 1.1547);

  //   background: ${(props) => (props.featured ? 'red' : 'green')};
  background: ${(props) =>
    props.imgUrl ? `no-repeat center / 100% url('${props.imgUrl}')` : 'blue'};
  //   &:nth-child(odd) {
  //     background: green;
  //   }
`;

const StyledGitPOAPBadge = styled(GitPOAPBadge)`
  position: absolute;
`;

let width = 12;
let height = 4;
// let gitpoaps = [...Array(5)];
let gitpoaps = [
  real_badge1,
  real_badge2,
  real_badge3,
  real_badge4,
  real_badge5,
  real_badge6,
  real_badge7,
  real_badge8,
  real_badge9,
  real_badge10,
  real_badge11,
  real_badge12,
].slice(0, 7);

let images = [
  'https://assets.poap.xyz/gitpoap-2020-truffle-contributor-2020-logo-1649262289456.png',
  'https://assets.poap.xyz/gitpoap-2018-web3js-contributor-2018-logo-1649267123396.png',
  'https://assets.poap.xyz/gitpoap-2019-truffle-contributor-2019-logo-1649262236424.png',
  'https://assets.poap.xyz/gitpoap-2020-trufflesuitecom-contributor-2020-logo-1649268807709.png',
  'https://assets.poap.xyz/gitpoap-2022-trufflesuitecom-contributor-2022-logo-1649268861179.png',
  'https://assets.poap.xyz/gitpoap-2017-truffle-contributor-2017-logo-1649262094154.png',
  'https://assets.poap.xyz/gitpoap-2017-trufflesuitecom-contributor-2017-logo-1649268651751.png',
  'https://assets.poap.xyz/gitpoap-2022-truffle-contributor-2022-logo-1649262354204.png',
  'https://assets.poap.xyz/gitpoap-2018-truffle-contributor-2018-logo-1649262185269.png',
  'https://assets.poap.xyz/gitpoap-2021-truffle-contributor-2021-logo-1649262333030.png',
];

// https://eperezcosano.github.io/hex-grid/
// https://stackoverflow.com/questions/43911775/how-to-draw-an-infinite-hexagon-spiral
const HexGrid = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //document.getElementById('canvas');
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const a = (2 * Math.PI) / 6;
  const r = 100;

  useEffect(() => {
    if (canvasRef) {
      setCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvas) {
      setCtx(canvas.getContext('2d'));
    }
  }, [canvas]);

  useEffect(() => {
    if (ctx) {
      cluster(canvas.width / 2, canvas.height / 2, images.length);
    }
  }, [ctx]);

  const hexagon = (centerX: number, centerY: number, it: number) => {
    // console.log(centerX, centerY, it);
    // var x = centerX + Math.cos((Math.PI * 2) / 6) * r;
    // var y = centerY + Math.sin((Math.PI * 2) / 6) * r;

    // var x = centerX + r * Math.cos(0);
    // var y = centerY + r * Math.sin(0);
    let rs = r - 2;

    const image = new Image();
    image.src = images[it % images.length];
    image.onload = () => {
      ctx.save();
      ctx.beginPath();
      //   ctx.moveTo(x, y);
      ctx.moveTo(
        centerX + Math.cos(0 - (Math.PI * 2) / 4) * r,
        centerY + Math.sin(0 - (Math.PI * 2) / 4) * r,
      );

      for (var i = 1; i < 7; i++) {
        // x = centerX + Math.cos(((Math.PI * 2) / 6) * i) * r;
        // y = centerY + Math.sin(((Math.PI * 2) / 6) * i) * r;

        // ctx.lineTo(x, y);
        ctx.lineTo(
          centerX + Math.cos((i * (Math.PI * 2)) / 6 - (Math.PI * 2) / 4) * r,
          centerY + Math.sin((i * (Math.PI * 2)) / 6 - (Math.PI * 2) / 4) * r,
        );
      }

      ctx.closePath();
      ctx.clip();

      ctx.drawImage(image, centerX - rs, centerY - rs, rs * 2, rs * 2); //, this.canvasA.width, this.canvasA.height);

      ctx.stroke();
      ctx.restore();
    };
  };

  const cluster = (centerX: number, centerY: number, count: number) => {
    var x = centerX,
      y = centerY,
      angle = Math.PI / 3,
      dist = Math.sin(angle) * (r * 2),
      side = 0;

    var it = 0;
    hexagon(x, y, it++);
    while (it < count) {
      for (var t = 0; t < Math.floor((side + 4) / 6) + (side % 6 == 0) && it < count; t++) {
        y = y - dist * Math.cos(side * angle - Math.PI / 2);
        x = x - dist * Math.sin(side * angle - Math.PI / 2);
        hexagon(x, y, it++);
      }
      side++;
    }
  };

  return <canvas ref={canvasRef} id="canvas" width="1200" height="800" />;
};

export default {
  title: 'Compounds/HexGridCanvas',
  component: HexGrid,
} as ComponentMeta<typeof HexGrid>;

const Template: ComponentStory<typeof HexGrid> = (args) => {
  return <HexGrid {...args} />;
};

export const Default = Template.bind({});

//   drawGrid(canvas.width, canvas.height);

//   function drawGrid(width: number, height: number) {
//     let i = 0;
//     for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
//       for (
//         let x = r, j = 0;
//         x + r * (1 + Math.cos(a)) < width;
//         x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
//       ) {
//         drawHexagon(x, y, i);
//         i++;
//       }
//     }
//   }

//   function drawHexagon(x: number, y: number, i: number) {
//     const image = new Image();
//     image.src = images[i % images.length];
//     image.onload = () => {
//       ctx.save();
//       ctx.beginPath();
//       for (let i = 0; i < 6; i++) {
//         ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
//       }
//       // ctx.drawImage(img, 0, 0);
//       // ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//       // ctx.fill();
//       ctx.closePath();
//       ctx.clip();

//       ctx.drawImage(image, x - r, y - r, r * 2, r * 2); //, this.canvasA.width, this.canvasA.height);

//       ctx.stroke();
//       ctx.restore();
//     };

//   let r = 50;
