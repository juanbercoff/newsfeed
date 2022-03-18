import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/layout';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { UserProfileContainer } from '../contexts/user-context';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UserProfileContainer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProfileContainer>
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
