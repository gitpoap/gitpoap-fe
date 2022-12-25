import { track } from '@amplitude/analytics-browser';

export const trackLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const { href, target } = e.currentTarget;
  const { pathname } = window.location;

  track('click_link', {
    href,
    target,
    pathname,
  });
};

export const trackPageView = (pathname: string, asPath: string) => {
  track('page_view', {
    pathname,
    asPath,
  });
};

export const trackClickMint = (address: string | undefined, claimIds: number[]) => {
  track('click_mint', {
    address,
    claimIds,
  });
};

export const trackClickMintAll = (address: string | null, claimIds: number[]) => {
  track('click_mint_all', {
    address,
    claimIds,
  });
};

export const trackConnectWallet = (address: string | undefined) => {
  track('connect_wallet', {
    address,
  });
};

export const trackDisconnectWallet = (address: string | null) => {
  track('disconnect_wallet', {
    address,
  });
};

export const trackSelectWalletModalOption = (option: string) => {
  track('select_wallet_modal_option', {
    option,
  });
};

export const trackClickManageGitPOAP = (gitpoapId: number) => {
  track('click_manage_gitpoap', {
    gitpoapId,
  });
};

export const trackClickCheckEligibility = () => {
  track('click_check_eligibility');
};

export const trackClickIssueGitPOAPs = () => {
  track('click_issue_gitpoaps');
};

export const trackOpenClaimModal = () => {
  track('open_claim_modal');
};

export const trackGoToSettings = () => {
  track('go_to_settings');
};

export const trackSearchInputFocused = () => {
  track('search_input_focused');
};

export const trackClickSearchItem = (
  type: 'gitpoap' | 'profile' | 'repo' | 'org',
  id: string | number,
) => {
  track('click_search_item', {
    type,
    id,
  });
};

export const trackClickSubmitOnboarding = () => {
  track('click_submit_onboarding');
};

export const trackClickEmailSignup = (location: 'footer') => {
  track('click_email_signup', {
    location,
  });
};

export const trackItemListShowMore = () => {
  track('item_list_show_more');
};

export const trackItemListChangeFilter = (value: string | null) => {
  track('item_list_change_filter', {
    value,
  });
};

export const trackSearchForGitPOAP = (query: string) => {
  track('search_for_gitpoap', {
    query,
  });
};

export const trackSearchForRepos = (query: string) => {
  track('search_for_repos', {
    query,
  });
};

export const trackSearchForOrgs = (query: string) => {
  track('search_for_orgs', {
    query,
  });
};

export const trackOpenAddContributorsModal = (gitpoapId: number) => {
  track('open_add_contributors_modal', {
    gitpoapId,
  });
};

export const trackDeleteClaimOnManagePage = (claimId: number) => {
  track('delete_claim_on_manage_page', {
    claimId,
  });
};

export const trackClickSaveUserSettings = () => {
  track('click_save_user_settings');
};

export const trackAddAccountConnection = (type: string) => {
  track('add_account_connection', {
    type,
  });
};
