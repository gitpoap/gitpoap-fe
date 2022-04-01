import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CopyableText } from '../../components/shared/elements/CopyableText';

export default {
  title: 'Elements/CopyableText',
  component: CopyableText,
} as ComponentMeta<typeof CopyableText>;

const Template: ComponentStory<typeof CopyableText> = (args) => {
  return <CopyableText {...args}></CopyableText>;
};

export const Default = Template.bind({});
Default.args = { text: 'URL: gitpoap.io/p/burz.eth', textToCopy: 'https://gitpoap.io/p/burz.eth' };
