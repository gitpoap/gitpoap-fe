import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../components/shared/elements/Button';
import { ButtonVariant, MantineSize, MANTINE_SIZES, SimpleGrid } from '@mantine/core';

export default {
  title: 'Elements/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = { children: 'Mint All' };

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = { children: 'Mint All', disabled: true };

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = { children: 'Mint All', disabled: true, loading: true };

export const Outline = Template.bind({});
Outline.args = { children: 'Mint All', variant: 'outline' };

export const OutlineDisabled = Template.bind({});
OutlineDisabled.args = { children: 'Mint All', variant: 'outline', disabled: true };

export const OutlineLoading = Template.bind({});
OutlineLoading.args = { children: 'Mint All', variant: 'outline', disabled: true, loading: true };

const BUTTON_VARIANTS: ButtonVariant[] = [
  'filled',
  'outline',
  'light',
  'gradient',
  'white',
  'default',
  'subtle',
];
const SizesTemplate: ComponentStory<typeof Button> = (args) => {
  return (
    <SimpleGrid cols={BUTTON_VARIANTS.length}>
      {BUTTON_VARIANTS.map((variant: ButtonVariant, i: number) => (
        <div key={`title-${i}`}>{variant}</div>
      ))}
      {MANTINE_SIZES.map((size: MantineSize, i: number) =>
        BUTTON_VARIANTS.map((variant: ButtonVariant) => (
          <div key={`button-${i}`}>
            <Button size={size} variant={variant}>
              Button
            </Button>
          </div>
        )),
      )}
    </SimpleGrid>
  );
};
export const Sizes = SizesTemplate.bind({});
