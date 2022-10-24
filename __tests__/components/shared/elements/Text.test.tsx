import 'jest-styled-components';
import React from 'react';
import { Text } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Text', () => {
  it('renders a Text', () => {
    const { container } = renderWithTheme(<Text>{'Text'}</Text>);

    const text = container.firstChild;

    expect(text).toBeInTheDocument();
    expect(text).toMatchSnapshot();
  });
});
