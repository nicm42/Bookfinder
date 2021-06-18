import { createContext } from 'react';

type ButtonContextType = {
  isPreviousResults: boolean;
  isMoreResults: boolean;
};

const ButtonContext = createContext<ButtonContextType>({
  isPreviousResults: false,
  isMoreResults: false,
});

export default ButtonContext;
