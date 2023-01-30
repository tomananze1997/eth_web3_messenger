import { Layout } from 'components';
import type { AppProps } from 'next/app';
import { DarkModeProvider } from 'providers';
import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <DarkModeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DarkModeProvider>
  </>
);

export default App;
