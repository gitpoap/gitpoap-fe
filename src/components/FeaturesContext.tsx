import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Features = 'hasDiscordOAuth';
type FeaturesState = Record<Features, boolean>;

export const getInitialState = (): FeaturesState => ({
  hasDiscordOAuth: true,
});

const FeaturesContext = createContext<FeaturesState>({} as FeaturesState);

export const useFeatures = () => {
  return useContext(FeaturesContext);
};

type Props = {
  children: React.ReactNode;
};

export const FeaturesProvider = ({ children }: Props) => {
  const router = useRouter();
  const [featuresState, setFeaturesState] = useState<FeaturesState>(getInitialState());

  useEffect(() => {
    const newFeaturesState = featuresState;
    for (const key in router.query) {
      if (key in newFeaturesState) {
        const isFeatureActive = router.query[key] === 'true';
        if (isFeatureActive) {
          newFeaturesState[key as keyof FeaturesState] = true;
        }
      }
    }
    setFeaturesState(newFeaturesState);
  }, [router.query]);

  return <FeaturesContext.Provider value={featuresState}>{children}</FeaturesContext.Provider>;
};
