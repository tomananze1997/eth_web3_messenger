import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Layout } from 'components';
import type { AppProps } from 'next/app';
import {
  DarkModeProvider,
  SelectedContentProvider,
  Web3Provider
} from 'providers';
import 'styles/globals.css';
import { WagmiConfig, configureChains, createClient, goerli } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';

const App = ({ Component, pageProps }: AppProps) => {
  const { chains, provider } = configureChains(
    [goerli],
    [infuraProvider({ apiKey: `${process.env.NEXT_PUBLIC_INFURA_API_KEY}` })]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Blockchain Messenger',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
  });

  return (
    <>
      <DarkModeProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Web3Provider>
              <SelectedContentProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </SelectedContentProvider>
            </Web3Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </DarkModeProvider>
    </>
  );
};

export default App;
