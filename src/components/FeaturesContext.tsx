import React, { createContext, useState, useContext } from 'react';

type FeaturesState = {
  hasHomePageRecentProjects: boolean;
  /* Whether user should see a page showing all gitpoaps */
  hasGitPOAPsPage: boolean;
  hasProjectsPage: boolean;
  hasDocs: boolean;
  hasCheckIfImEligible: boolean;
  hasClaimAllButton: boolean;
  hasOrganizations: boolean;
  hasEnsAvatar: boolean;
};

export const getInitialState = (): FeaturesState => ({
  hasHomePageRecentProjects: false,
  hasGitPOAPsPage: false,
  hasProjectsPage: true,
  hasDocs: true,
  hasCheckIfImEligible: false,
  hasClaimAllButton: false,
  hasOrganizations: false,
  hasEnsAvatar: false,
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
