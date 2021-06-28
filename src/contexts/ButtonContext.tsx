import { createContext } from 'react';

export type ButtonContextType = {
  isPreviousResults: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsPreviousResults: (isPreviousResults: boolean) => void;
  isMoreResults: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsMoreResults: (isMoreResults: boolean) => void;
};

const ButtonContext = createContext<ButtonContextType>({
  isPreviousResults: false,
  setIsPreviousResults: () => {},
  isMoreResults: false,
  setIsMoreResults: () => {},
});

export default ButtonContext;
