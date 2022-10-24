import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { ItemList, SelectOption } from '../../../../src/components/shared/compounds/ItemList';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

type SortOptions = 'date' | 'alphabetical';
const selectOptions: SelectOption<SortOptions>[] = [
  { value: 'date', label: 'Mint Date' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

const colors = ['test1', 'test2'];

describe('ItemList', () => {
  it('should render title', () => {
    renderWithTheme(
      <ItemList
        title="colors"
        selectOptions={selectOptions}
        selectValue="date"
        onSelectChange={() => {}}
        isLoading={false}
        hasShowMoreButton={true}
        showMoreOnClick={() => {}}
      >
        {colors.map((color) => (
          <div key={color} style={{ color }}>
            {color}
          </div>
        ))}
      </ItemList>,
    );
    const colorsText = screen.getByText('colors');
    expect(colorsText).toBeInTheDocument();
    expect(colorsText).toMatchSnapshot();
  });

  it('should render search input', () => {
    renderWithTheme(
      <ItemList
        title="colors"
        selectOptions={selectOptions}
        selectValue="date"
        onSelectChange={() => {}}
        isLoading={false}
        hasShowMoreButton={true}
        showMoreOnClick={() => {}}
        searchInputValue="test1"
        searchInputPlaceholder="placeholder-test"
        onSearchInputChange={() => {}}
      >
        {colors.map((color) => (
          <div key={color} style={{ color }}>
            {color}
          </div>
        ))}
      </ItemList>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'placeholder-test');
    expect(input).toHaveValue('test1');
    expect(input).toMatchSnapshot();
  });

  it('should render items', () => {
    renderWithTheme(
      <ItemList
        selectOptions={selectOptions}
        selectValue="date"
        onSelectChange={() => {}}
        isLoading={false}
        hasShowMoreButton={true}
        showMoreOnClick={() => {}}
      >
        {colors.map((color) => (
          <div key={color} style={{ color }}>
            {color}
          </div>
        ))}
      </ItemList>,
    );
    const test1Text = screen.getByText('test1');
    expect(test1Text).toBeInTheDocument();
    expect(test1Text).toMatchSnapshot();
    const test2Text = screen.getByText('test2');
    expect(test2Text).toBeInTheDocument();
    expect(test2Text).toMatchSnapshot();
  });

  it('should render show more button', () => {
    renderWithTheme(
      <ItemList
        selectOptions={selectOptions}
        selectValue="date"
        onSelectChange={() => {}}
        isLoading={false}
        hasShowMoreButton={true}
        showMoreOnClick={() => {}}
      >
        {colors.map((color) => (
          <div key={color} style={{ color }}>
            {color}
          </div>
        ))}
      </ItemList>,
    );
    const showMoreButton = screen.getByRole('button', { name: 'Show more' });
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toMatchSnapshot();
  });

  it('should not render show more button', () => {
    renderWithTheme(
      <ItemList
        selectOptions={selectOptions}
        selectValue="date"
        onSelectChange={() => {}}
        isLoading={false}
        hasShowMoreButton={false}
        showMoreOnClick={() => {}}
      >
        {colors.map((color) => (
          <div key={color} style={{ color }}>
            {color}
          </div>
        ))}
      </ItemList>,
    );
    const showMoreButton = screen.queryByRole('button', { name: 'Show more' });
    expect(showMoreButton).not.toBeInTheDocument();
    expect(showMoreButton).toMatchSnapshot();
  });
});
