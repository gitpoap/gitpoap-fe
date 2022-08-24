import React, { useContext, useMemo, useState } from 'react';

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

export const ClaimModalContextProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );

  return <ClaimModalContext.Provider value={value}>{children}</ClaimModalContext.Provider>;
};
