import { useState, useCallback } from "react";
import { createContext, useContextSelector } from "use-context-selector";

export interface BalanceContextData {
  currentBalance: number;
  changeBalance: (value: number) => void;
}

export const BalanceContext = createContext<BalanceContextData>(
  {} as BalanceContextData
);

export const BalanceProvider: React.FC = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const changeBalance = useCallback((value: number) => {
    setCurrentBalance(value);
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        currentBalance,
        changeBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export function useCurrentBalance(): BalanceContextData {
  const changeBalance = useContextSelector(
    BalanceContext,
    (x) => x.changeBalance
  );
  const currentBalance = useContextSelector(
    BalanceContext,
    (x) => x.currentBalance
  );

  return {
    changeBalance,
    currentBalance,
  };
}
