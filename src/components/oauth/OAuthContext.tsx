import React, { createContext, useContext } from 'react';
import { useGithubAuth } from './hooks/useGithubAuth';
import { useDiscordAuth } from './hooks/useDiscordAuth';

type OAuthContextData = {
  github: {
    disconnect: () => void;
    authorize: () => void;
  };
  discord: {
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
  const discord = useDiscordAuth();

  return (
    <OAuthContext.Provider
      value={{
        github: { ...github },
        discord: { ...discord },
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};
