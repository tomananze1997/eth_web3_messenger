import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Layout } from 'components';
import type { AppProps } from 'next/app';
import { DarkModeProvider } from 'providers';
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
    autoConnect: true,
    connectors,
    provider
  });

  return (
    <>
      <DarkModeProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </DarkModeProvider>
    </>
  );
};

export default App;
