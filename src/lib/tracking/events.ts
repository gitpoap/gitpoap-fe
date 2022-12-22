import mixpanel from 'mixpanel-browser';

export const trackLinkClick = (href: string, target: EventTarget) => {
  mixpanel.track_links(`a[href="${href}"]`, 'click_link', {
    href,
    target,
  });
};

export const trackClickMint = (address: string | undefined, claimIds: number[]) => {
  mixpanel.track('click_mint', {
    address,
    claimIds,
  });
};

export const trackClickMintAll = (address: string | null, claimIds: number[]) => {
  mixpanel.track('click_mint_all', {
    address,
    claimIds,
  });
};

export const trackConnectWallet = (address: string | undefined) => {
  mixpanel.track('connect_wallet', {
    address,
  });
};

export const trackDisconnectWallet = (address: string | null) => {
  mixpanel.track('disconnect_wallet', {
    address,
  });
};

export const trackSelectWalletModalOption = (option: string) => {
  mixpanel.track('select_wallet_modal_option', {
    option,
  });
};

export const trackClickManageGitPOAP = (gitpoapId: number) => {
  mixpanel.track('click_manage_gitpoap', {
    gitpoapId,
  });
};

export const trackClickCheckEligibility = () => {
  mixpanel.track('click_check_eligibility', {});
};

export const trackClickIssueGitPOAPs = () => {
  mixpanel.track('click_issue_gitpoaps', {});
};

export const trackOpenClaimModal = () => {
  mixpanel.track('open_claim_modal', {});
};

export const trackGoToSettings = () => {
  mixpanel.track('go_to_settings', {});
};

export const trackSearchInputFocused = () => {
  mixpanel.track('search_input_focused', {});
};

export const trackClickSearchItem = (
  type: 'gitpoap' | 'profile' | 'repo' | 'org',
  id: string | number,
) => {
  mixpanel.track('click_search_item', {
    type,
    id,
  });
};

export const trackClickSubmitOnboarding = () => {
  mixpanel.track('click_submit_onboarding', {});
};

export const trackClickEmailSignup = (location: 'footer') => {
  mixpanel.track('click_email_signup', {
    location,
  });
};

export const trackItemListShowMore = () => {
  mixpanel.track('item_list_show_more', {});
};

export const trackItemListChangeFilter = (value: string | null) => {
  mixpanel.track('item_list_change_filter', {
    value,
  });
};

export const trackSearchForGitPOAP = (query: string) => {
  mixpanel.track('search_for_gitpoap', {
    query,
  });
};

export const trackSearchForRepos = (query: string) => {
  mixpanel.track('search_for_repos', {
    query,
  });
};

export const trackSearchForOrgs = (query: string) => {
  mixpanel.track('search_for_orgs', {
    query,
  });
};

export const trackOpenAddContributorsModal = (gitpoapId: number) => {
  mixpanel.track('open_add_contributors_modal', {
    gitpoapId,
  });
};

export const trackDeleteClaimOnManagePage = (claimId: number) => {
  mixpanel.track('delete_claim_on_manage_page', {
    claimId,
  });
};

export const trackClickSaveUserSettings = () => {
  mixpanel.track('click_save_user_settings', {});
};

export const trackAddAccountConnection = (type: string) => {
  mixpanel.track('add_account_connection', {
    type,
  });
};
