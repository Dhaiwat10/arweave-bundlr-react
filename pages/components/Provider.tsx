import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { WebBundlr } from '@bundlr-network/client';
import { BigNumber, ethers, providers } from 'ethers';

interface IAppContextType {
  bundlr: WebBundlr | undefined;
  balance: string | undefined;
  setBalance: Dispatch<SetStateAction<string | undefined>>;
}

export const AppContext = createContext<IAppContextType>({
  bundlr: undefined,
  balance: undefined,
  setBalance: () => {},
});

interface IProviderProps {
  children: ReactNode;
  signerOrProvider?: providers.BaseProvider;
  bundlrRpcUrl?: string;
  currency?: string;
}

export const Provider: FC<IProviderProps> = ({
  children,
  signerOrProvider,
  bundlrRpcUrl = 'https://node1.bundlr.network',
  currency = 'matic',
}) => {
  const [bundlr, setBundlr] = useState<WebBundlr>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    const bundlr = new WebBundlr(
      bundlrRpcUrl,
      currency,
      signerOrProvider || ethers.getDefaultProvider()
    );
    setBundlr(bundlr);
  }, [signerOrProvider, bundlrRpcUrl, currency]);

  useEffect(() => {
    (async () => {
      if (bundlr) {
        const balance = await bundlr.getLoadedBalance();
        setBalance(balance.toString());
      }
    })();
  }, [bundlr]);

  return (
    <AppContext.Provider
      value={{
        bundlr,
        balance,
        setBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
