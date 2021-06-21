import { createContext } from 'react';

export type SearchContextType = {
  searchText: string;
  searchType: string;
};

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  searchType: '',
});

export default SearchContext;
