import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useIsFetching } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Routes from '@/pages';
import { FullScreenLoading } from '@zblash/op-web-fronted';
import { css } from '@/styled';
import { LoadingContext } from '@/contexts/loading-context';
import { AuthProvider } from '@/contexts/auth-context';

const opacityLoading = css`
  opacity: 0.7;
`;

function App() {
  const [loading, setLoading] = React.useState(false);
  const isFetching = useIsFetching();

  React.useEffect(() => {
    if (isFetching > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isFetching]);

  return (
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

          <Routes />
          <ToastContainer />
        </LoadingContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
