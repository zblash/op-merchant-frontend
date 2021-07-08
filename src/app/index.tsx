import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContext } from './context';
import Routes from '~/pages';
import { PopupContextProvider } from '~/contexts/popup';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { css } from '~/styled';
import { IAddressStateResponse } from '~/services/helpers/backend-models';
import { hasToken, ApiCall } from '~/services/api';
import OutRouter from '~/pages/out-router';
import { User } from '~/services/helpers/maps';
import { LoadingContext } from '~/contexts/loading-context';

const opacityLoading = css`
  opacity: 0.7;
`;

function App() {
  const [loading, setLoading] = React.useState(false);
  const [userState, setUserState] = React.useState<User>();
  const [userInfoError, setUserInfoError] = React.useState(false);
  const setUserActiveState = React.useCallback(
    (activeState: IAddressStateResponse[]) => {
      setUserState(prevState => ({
        ...prevState,
        activeStates: activeState,
      }));
    },
    [setUserState],
  );

  React.useEffect(() => {
    if (hasToken) {
      ApiCall.get('/user/info')
        .then(_user => {
          setUserState({
            ..._user,
            isAdmin: _user.role === 'ADMIN',
            isCustomer: _user.role === 'CUSTOMER',
            isMerchant: _user.role === 'MERCHANT',
          });
          setLoading(false);
        })
        .catch(() => {
          setUserInfoError(true);
          setLoading(false);
        });
    } else {
      setUserInfoError(true);
    }
  }, []); //eslint-disable-line

  return (
    <BrowserRouter>
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
        {!userInfoError && userState && (
          <ApplicationContext.Provider
            value={{
              user: userState,
              setUserActiveState,
            }}
          >
            <PopupContextProvider>
              <Routes />
            </PopupContextProvider>
          </ApplicationContext.Provider>
        )}
        {userInfoError && !userState && <OutRouter />}
      </LoadingContext.Provider>
    </BrowserRouter>
  );
}

export default App;
