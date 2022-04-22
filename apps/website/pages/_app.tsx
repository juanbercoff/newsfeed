import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/layout';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { UserProfileContainer } from '../contexts/user-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import App from 'next/app';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <UserProfileContainer>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer position="bottom-center" />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
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
