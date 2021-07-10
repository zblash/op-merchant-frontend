import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Routes from '~/pages';
import { PopupContextProvider } from '~/contexts/popup';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { css } from '~/styled';
import { LoadingContext } from '~/contexts/loading-context';
import { AuthProvider } from '~/contexts/auth-context';

const opacityLoading = css`
  opacity: 0.7;
`;

function App() {
  const queryClientRef = React.useRef<any>();
  if (!queryClientRef.current) {
    const queryCache = new QueryCache();
    queryClientRef.current = new QueryClient({
      queryCache,
      defaultOptions: {
        queries: {
          staleTime: 3 * 60 * 1000,
          retry: false,
        },
      },
    });
  }
  const [loading, setLoading] = React.useState(false);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <BrowserRouter>
        <AuthProvider>
          <LoadingContext.Provider
            value={{
              show: () => {
                setLoading(true);
              },
              hide: () => {
                setLoading(false);
              },
            }}
          >
            {loading && <FullScreenLoading className={opacityLoading} />}

            <PopupContextProvider>
              <Routes />
            </PopupContextProvider>
            <ToastContainer />
          </LoadingContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
