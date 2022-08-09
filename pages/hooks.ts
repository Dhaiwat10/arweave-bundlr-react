import { useContext } from 'react';
import { AppContext } from './components/Provider';

export const useBalance = () => {
  const { balance, bundlr, setBalance } = useContext(AppContext);

  const fetchBalance = async () => {
    const balance = await bundlr?.getLoadedBalance();
    setBalance(balance?.toString());
  };

  return { balance, fetchBalance };
};
