import Head from 'next/head';
import '../global.css';
import { AppWrapper } from '../context/state';
import '../fonts.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem('token');

    // If there's no token and the user is not already on the login page, redirect to login
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

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
