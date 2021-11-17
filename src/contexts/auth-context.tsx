import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IBaseUser, IUserInfoResponse, TokenService, ApiCallService } from '@onlineplasiyer/op-web-fronted';
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
  const { data: userDetails, error: userDetailsError } = useGetUserInfos(loadUserDetails);

  const logout = React.useCallback((redirectLocation?: string) => {
    TokenService.removeToken();
    ApiCallService.unRegisterAuthToken();
    setUser(undefined);
    window.location.href = redirectLocation || '/login';
  }, []);

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
    if (RoutesList.reverse().find(route => location.pathname.includes(route.basePath)).isPrivate) {
      if (!token || TokenService.isExpired(token)) {
        logout();
      } else {
        registerToken(token);

        setLoadUserDetails(true);
      }
    }
  }, [location.pathname, logout]);

  React.useEffect(() => {
    if (userDetailsError && RoutesList.reverse().find(route => location.pathname.includes(route.basePath)).isPrivate) {
      logout();
    }
  }, [location.pathname, logout, userDetailsError]);

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
