import React, { useState } from 'react';
import { rem } from 'polished';
import { utils } from 'ethers';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MultiSelect } from '../../components/shared/elements/MultiSelect';
import { shortenAddress } from '../../helpers';

export default {
  title: 'Elements/MultiSelect',
  component: MultiSelect,
  argTypes: {},
} as ComponentMeta<typeof MultiSelect>;

type Item = { value: string; label: string };

const Template: ComponentStory<typeof MultiSelect> = (args) => {
  const [data, setData] = useState<Item[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  return (
    <MultiSelect
      {...args}
      sx={{
        width: `${rem(500)}`,
      }}
      data={data}
      getCreateLabel={(query) => `+ Add ${query}`}
      onCreate={(query) => {
        const item = { label: shortenAddress(query), value: query };
        if (!utils.isAddress(query)) {
          setError(`${query} is an invalid address`);
          return;
        } else {
          setError('');
          setData((current) => [...current, item]);
          return item;
        }
      }}
      value={values}
      onChange={setValues}
      error={error}
      searchable
      creatable
    />
  );
};

export const Default = Template.bind({});
Default.args = { label: 'Enter ETH addresses', placeholder: '0x1234567890b' };
