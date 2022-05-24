import styled from 'styled-components';
import { Navbar } from './Navbar';
import { Footer } from './FooterNew';
import { MidnightBlue } from '../colors';

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

export const Layout = ({ children }: Props) => {
  return (
    <App>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </App>
  );
};
