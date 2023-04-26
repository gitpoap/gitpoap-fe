import React, { createContext, useContext } from 'react';
import { useGithubAuth } from './hooks/useGithubAuth';

type OAuthContextData = {
  github: {
    disconnect: () => void;
    authorize: () => void;
  };
};

const OAuthContext = createContext<OAuthContextData>({} as OAuthContextData);

export const useOAuthContext = () => {
  return useContext(OAuthContext);
};

type Props = {
  children: React.ReactNode;
};

export const OAuthProvider = ({ children }: Props) => {
  const github = useGithubAuth();

  return (
    <OAuthContext.Provider
      value={{
        github: { ...github },
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};
