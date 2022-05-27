import { createGlobalStyle } from 'styled-components';
import { MidnightBlue } from '../colors';

export const GlobalStyles = createGlobalStyle`
  html {
    overflow: hidden;
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'PT Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    height: 100%;
    overflow: auto;
    font-size: 0.875rem;
    background-color: ${MidnightBlue};
  }

  a {
    text-decoration: none;
  }

  * {
  box-sizing: border-box;
  }

  .web3modal-modal-lightbox { z-index: 220 !important; }
`;
