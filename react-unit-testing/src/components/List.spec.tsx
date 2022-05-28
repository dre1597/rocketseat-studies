import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
  it('should render list item', () => {
    const { unmount } = render(
      <List inicialItems={['Neha', 'Ruthie', 'Roosevelt']} />
    );

    expect(screen.getByText('Neha')).toBeInTheDocument();
    // if there is more than one element with this text it will be fail
    expect(screen.getByText('Ruthie')).toBeInTheDocument();
    expect(screen.getByText('Roosevelt')).toBeInTheDocument();

    unmount();
    render(<List inicialItems={['Fermin']} />);

    expect(screen.getByText('Fermin')).toBeInTheDocument();
    expect(screen.queryByText('Neha')).not.toBeInTheDocument();
  });

  it('should be able to add new item to the the list', async () => {
    const { getByText, getByPlaceholderText } = render(
      <List inicialItems={[]} />
    );

    const inputElement = getByPlaceholderText('New item');
    const addButton = getByText('Add');

    await userEvent.type(inputElement, 'New Item');
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('New Item')).toBeInTheDocument();
    });
  });

  it('should be able to remove item from the the list', async () => {
    const { getAllByText, queryByText } = render(
      <List inicialItems={['Neha']} />
    );

    const removeButtons = getAllByText('Remove');

    await userEvent.click(removeButtons[0]);

    // first way
    // await waitForElementToBeRemoved(() => {
    //   return getByText('Neha');
    // });

    // second way
    await waitFor(() => {
      expect(queryByText('Neha')).not.toBeInTheDocument();
    });
  });
});
