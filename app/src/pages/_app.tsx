import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { Theme } from '@radix-ui/themes';
import { ThirdwebProvider } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Theme>
        <ThirdwebProvider
          activeChain="base-goerli"
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        >
          <title>BROWNOMICS</title>
          <Component {...pageProps} />
        </ThirdwebProvider>
        <ToastContainer />
      </Theme>
    </>
  );
}
