import React, { createContext, ReactNode, useReducer } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useLocalStorage } from '@mantine/hooks';
import { Theme, themes, ThemeNames } from '../theme';

type Props = {
  children: ReactNode;
  hasThemeSupport?: boolean;
};

enum ThemeActionsNames {
  TOGGLE = 'TOGGLE',
  SET = 'SET',
}

type ToggleAction = {
  type: ThemeActionsNames.TOGGLE;
};

type SetAction = {
  type: ThemeActionsNames.SET;
  payload: Theme;
};

type ThemeActions = ToggleAction | SetAction;

type ACTIONS = {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const ThemeDispatchContext = createContext<ACTIONS>({} as ACTIONS);

export const ThemeProvider = ({ children }: Props) => {
  const [themePreference, setThemePreference] = useLocalStorage<ThemeNames.light | ThemeNames.dark>(
    {
      key: 'theme-preference',
      defaultValue: ThemeNames.dark,
    },
  );

  const reducer = (theme: Theme, action: ThemeActions): Theme => {
    switch (action.type) {
      case ThemeActionsNames.TOGGLE:
        const newTheme =
          theme.name === ThemeNames.light ? themes[ThemeNames.dark] : themes[ThemeNames.light];
        setThemePreference(newTheme.name);
        return newTheme;

      case ThemeActionsNames.SET:
        return action.payload ?? themes[ThemeNames.dark];

      default:
        return theme;
    }
  };

  const [state, dispatch] = useReducer(
    reducer,
    themePreference === ThemeNames.dark ? { ...themes.dark } : { ...themes.light },
  );

  const actions = {
    toggleTheme: () => dispatch({ type: ThemeActionsNames.TOGGLE }),
    setTheme: (theme: Theme) => dispatch({ type: ThemeActionsNames.SET, payload: theme }),
  };

  return (
    <StyledThemeProvider theme={state}>
      <ThemeDispatchContext.Provider value={actions}>{children}</ThemeDispatchContext.Provider>
    </StyledThemeProvider>
  );
};
