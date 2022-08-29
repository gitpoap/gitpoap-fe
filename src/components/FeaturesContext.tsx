import React, { createContext, useState, useContext } from 'react';

type FeaturesState = {
  /* Whether user should see a page showing all gitpoaps */
  hasGitPOAPsPage: boolean;
  hasProjectsPage: boolean;
  hasCheckIfImEligible: boolean;
  hasClaimAllButton: boolean;
  hasOrganizations: boolean;
  hasTrendingReposPage: boolean;
};

export const getInitialState = (): FeaturesState => ({
  hasGitPOAPsPage: false,
  hasProjectsPage: true,
  hasCheckIfImEligible: false,
  hasClaimAllButton: true,
  hasOrganizations: false,
  hasTrendingReposPage: false,
});

const FeaturesContext = createContext<FeaturesState>({} as FeaturesState);

export const useFeatures = () => {
  return useContext(FeaturesContext);
};

type Props = {
  children: React.ReactNode;
};

export const FeaturesProvider = ({ children }: Props) => {
  const [featuresState, _] = useState<FeaturesState>(getInitialState());

  return <FeaturesContext.Provider value={featuresState}>{children}</FeaturesContext.Provider>;
};
