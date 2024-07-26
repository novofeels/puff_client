import Head from 'next/head';
import '../global.css';
import { AppWrapper } from '../context/state';
import '../fonts.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppWrapper>
      {getLayout(
        <>
          <Head>
            <title>Puff</title>
            {/* Add favicon links */}
            <link rel="icon" href="./assets/logo.png" type="image/png" />
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </AppWrapper>
  );
}
