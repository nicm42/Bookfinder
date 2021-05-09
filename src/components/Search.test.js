import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Search from './Search';

//jest.mock('axios');
//axios.get = jest.fn();

afterEach(cleanup);

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Search />);
  });

  it('has an input element with a label', () => {
    render(<Search />);
    const inputElement = screen.getByRole('searchbox');
    const label = screen.getByText('Search for a book');
    expect(inputElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('calls axios when submit is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: { greeting: 'hello world' } });
    render(<Search />);
    await whenStable;
    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/books/v1/volumes?q='
    );
  });
  /* it('mocks axios', async () => {
    axios.get.mockResolvedValueOnce({ data: { greeting: 'hello there' } });
    const url = '/greeting';
    const { getByTestId } = render(<Search url={url} />);
    //const resolvedSpan = await waitFor(() => getByTestId('resolved'));
    //expect(resolvedSpan).toHaveTextContent('hello there');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  }); */

  /* it('mocks axios requests', async () => {
    const data = {
      data: [
        {
          id: 1,
          title: 'title 1',
        },
        {
          id: 2,
          title: 'title 2',
        },
        {
          id: 3,
          title: 'mocked title',
        },
      ],
    };

    mockAxios.get.mockResolvedValueOnce(data);
    const { getByText } = render(<Search />);
    await waitFor(() => {
      expect(getByText('mocked title'));
      //expect(mockAPI).toHaveBeenCalledTimes(1);
    });
  });*/

  /* it('picks up text from input box when submit is clicked', () => {
    render(<Search />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);
    //expect(submitButton).toBeInTheDocument();
  }); */
});
