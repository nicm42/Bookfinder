import { createContext } from 'react';

export type SearchContextType = {
  searchText: string;
  // eslint-disable-next-line no-unused-vars
  setSearchText: (s: string) => void;
  searchType: string;
  // eslint-disable-next-line no-unused-vars
  setSearchType: (s: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
  searchType: '',
  setSearchType: () => {},
});

export default SearchContext;
