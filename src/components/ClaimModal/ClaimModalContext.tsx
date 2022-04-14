import React, { useCallback, useContext, useState } from 'react';

interface ClaimModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const defaultState: ClaimModalState = {
  isOpen: false,
  setIsOpen: () => {},
};

export const ClaimModalContext = React.createContext<ClaimModalState>(defaultState);
export const useClaimModalContext = () => useContext<ClaimModalState>(ClaimModalContext);

interface Props {
  children: React.ReactNode;
}

export default function ClaimModalContextProvider({ children }: Props) {
  const setIsOpen = useCallback((isOpen: boolean) => {
    setState((prev) => ({ ...prev, isOpen }));
  }, []);

  const [state, setState] = useState<ClaimModalState>({ isOpen: false, setIsOpen });

  return <ClaimModalContext.Provider value={state}>{children}</ClaimModalContext.Provider>;
}
