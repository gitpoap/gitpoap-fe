import React, { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ItemList, SelectOption } from '../../components/shared/compounds/ItemList';

export default {
  title: 'Compounds/ItemList',
  component: ItemList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ItemList>;

type SortOptions = 'date' | 'alphabetical';

const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

const Color = ({ color }: { color: string }) => {
  return <div style={{ color }}>{color}</div>;
};

export const WithSearch: ComponentStory<typeof ItemList> = (args) => {
  const perPage = 12;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [colors, setColors] = useState<string[]>(manyColors.slice(0, page * perPage));
  const [total, _] = useState<number>(manyColors.length);

  /* Hook to append new colors */
  useEffect(() => {
    setColors([...manyColors.slice(0, page * perPage)]);
  }, [page]);

  return (
    <ItemList
      searchInputPlaceholder={'Select Color ...'}
      searchInputValue={search}
      onSearchInputChange={(e) => setSearch(e.target.value)}
      {...args}
      title="Colors"
      selectOptions={selectOptions}
      selectValue="date"
      onSelectChange={() => console.warn('onChangeSelect')}
      showMoreOnClick={() => setPage(page + 1)}
      hasShowMoreButton={!!total && colors.length < total}
    >
      {colors
        .filter((color) => {
          if (search) {
            return color.includes(search);
          }

          return true;
        })
        .map((color) => (
          <Color key={color} color={color} />
        ))}
    </ItemList>
  );
};

export const IsLoading = WithSearch.bind({});
IsLoading.args = { isLoading: true };

export const NoSearch = WithSearch.bind({});
NoSearch.args = {
  searchInputPlaceholder: undefined,
  searchInputValue: undefined,
  onSearchInputChange: undefined,
};

const manyColors = [
  'orange',
  'maroon',
  'aqua',
  'red',
  'blue',
  'beige',
  'brown',
  'cyan',
  'green',
  'bisque',
  'yellow',
  'white',
  'purple',
  'pink',
  'gray',
  'grey',
  'magenta',
  'olive',
  'navy',
  'teal',
  'lime',
  'limegreen',
  'orangered',
  'orchid',
  'peru',
  'plum',
  'salmon',
  'skyblue',
  'snow',
  'tan',
  'tomato',
  'violet',
];
