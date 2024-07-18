import Head from 'next/head';
import '../global.css';


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>Puff</title>
        {/* Add favicon links */}
      
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

