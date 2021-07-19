import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ApiCallService } from '@/utils/api/ApiCall';
import TokenService from '@/utils/token-service';
import { IBaseUser, IUserInfoResponse } from '@/utils/api/api-models';
import { RoutesList } from '@/pages';
import { useGetUserInfos } from '@/queries/use-get-user-infos';

const AuthContext = React.createContext(
  {} as {
    user: IBaseUser | undefined;
    userDetails: IUserInfoResponse | undefined;
    authenticate: (token: string) => void;
    logout: (redirectLocation?: string) => void;
    isAuthenticated: boolean;
    token: string | undefined;
  },
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<IBaseUser>();
  const [loadUserDetails, setLoadUserDetails] = React.useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const { data: userDetails } = useGetUserInfos(loadUserDetails);

  const logout = (redirectLocation?: string) => {
    TokenService.removeToken();
    ApiCallService.unRegisterAuthToken();
    setUser(undefined);
    history.push(redirectLocation || '/login');
  };

  const registerToken = (token: string) => {
    const decodedUser = TokenService.decodeToken(token);
    setUser(decodedUser);
    ApiCallService.registerAuthToken(token);
  };

  const authenticate = (token: string) => {
    ApiCallService.registerAuthToken(token);
    try {
      TokenService.saveToken(token);
      registerToken(token);
      history.push('/');
    } catch (error) {
      ApiCallService.unRegisterAuthToken();
      setUser(undefined);
      TokenService.removeToken();
      history.push('/login');
    }
  };

  React.useEffect(() => {
    const token = TokenService.getToken();
    if (RoutesList.find(route => route.basePath === location.pathname).isPrivate) {
      if (!token || TokenService.isExpired(token)) {
        logout();
      } else {
        registerToken(token);
        //setLoadUserDetails(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        logout,
        isAuthenticated: !!user,
        token: TokenService.getToken(),
        userDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
