import { createContext } from 'react';

export type SearchContextType = {
  searchText: string;
  setSearchText: (s: string) => void;
  searchType: string;
  setSearchType: (s: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
  searchType: '',
  setSearchType: () => {},
});

export default SearchContext;
