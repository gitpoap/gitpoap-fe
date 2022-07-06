import styled from 'styled-components';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MidnightBlue } from '../colors';
import { FeedbackButton } from './FeedbackButton';
import { rem } from 'polished';
import { BREAKPOINTS, TYPEFORM_LINKS } from '../constants';

type Props = {
  children: React.ReactNode;
};

const App = styled.div`
  background-color: ${MidnightBlue};
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'PT Mono', monospace;
  min-height: 100vh;
  min-width: 300px;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledFeedbackButton = styled(FeedbackButton)`
  position: fixed;
  bottom: ${rem(60)};
  right: ${rem(60)};
  @media (max-width: ${rem(BREAKPOINTS.sm)}) {
    display: none;
  }
`;

export const Layout = ({ children }: Props) => {
  return (
    <App>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
      <StyledFeedbackButton href={TYPEFORM_LINKS.feedback} />
    </App>
  );
};
