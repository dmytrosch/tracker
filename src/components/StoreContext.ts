import { createContext, useContext } from 'react';
import RootStore from '../stores';

export const StoreContext = createContext<RootStore>({} as RootStore);

export const useStores = () => {
  const context = useContext(StoreContext);

  return context;
};
