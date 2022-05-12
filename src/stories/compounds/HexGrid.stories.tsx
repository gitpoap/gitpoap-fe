import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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

  background: ${(props) => (props.featured ? 'red' : 'green')};
  // background: ${(props) =>
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

let gitpoaps = [
  real_badge1,
  real_badge2,
  real_badge3,
  real_badge4,
  real_badge5,
  real_badge6,
  real_badge7,
  // real_badge8,
  // real_badge9,
  // real_badge10,
  // real_badge11,
  // real_badge12,
].slice(0, 7);

// https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/
const HexGrid = ({}) => {
  let length = width * height;

  let middle = Math.floor(gitpoaps.length / 2);

  let top = gitpoaps.length > 3 ? gitpoaps.slice(0, middle) : gitpoaps;
  let bottom = gitpoaps.length > 3 ? gitpoaps.slice(middle) : [];

  let topStart = Math.floor(12 + width / 2 - top.length / 2);
  let bottomStart = Math.ceil(24 + width / 2 - bottom.length / 2);

  const map = new Map();
  top.map((item, i) => map.set(topStart + i, item));
  bottom.map((item, i) => map.set(bottomStart + i, item));

  return (
    <Main>
      <Container>
        {[...Array(length)].map((_, i) => {
          return <Hex key={i} featured={map.has(i)} />;
          // return (
          //   <Hex key={i} featured={map.has(i)}>
          //     {map.has(i) ? <StyledGitPOAPBadge imgUrl={map.get(i)} size="sm" /> : null}
          //   </Hex>
          // );
        })}
      </Container>
    </Main>
  );
};

export default {
  title: 'Compounds/HexGrid',
  component: HexGrid,
} as ComponentMeta<typeof HexGrid>;

const Template: ComponentStory<typeof HexGrid> = (args) => {
  return <HexGrid {...args} />;
};

export const Default = Template.bind({});
