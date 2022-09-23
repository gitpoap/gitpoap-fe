import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { POAPItem, POAP } from '../../../../src/components/shared/compounds/POAPItem';

const renderPOAPItem = (poap: POAP) => {
  return render(<POAPItem poap={poap} />);
};

const testPoap: POAP = {
  created: '09/22/2022',
  owner: 'testOwner',
  tokenId: 'test',
  event: {
    city: '',
    country: '',
    description: 'test-description',
    end_date: '',
    event_url: '',
    expiry_date: '',
    fancy_id: '',
    id: 1,
    image_url: '/test/test.png',
    name: '',
    start_date: '',
    supply: 100,
    year: 2022,
  },
};
describe('POAPItem', () => {
  it('should render poap image', () => {
    renderPOAPItem(testPoap);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'test-description');
    expect(image).toMatchSnapshot();
  });
});
