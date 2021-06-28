import { createContext } from 'react';

export type CountContextType = {
  resultStart: number;
  // eslint-disable-next-line no-unused-vars
  setResultStart: (previousValue: any) => void;
  resultEnd: number;
  // eslint-disable-next-line no-unused-vars
  setResultEnd: (previousValue: any) => void;
};

const CountContext = createContext<CountContextType>({
  resultStart: -9,
  setResultStart: () => {},
  resultEnd: 0,
  setResultEnd: () => {},
});

export default CountContext;
