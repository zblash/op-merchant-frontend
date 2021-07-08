import React from 'react';
import { useHistory } from 'react-router-dom';
import { ApiCallService } from '~/utils/api/ApiCall';
import TokenService from '~/utils/token-service';
import { IBaseUser, IUserInfoResponse } from '~/utils/api/api-models';

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

export const AuthProvider = ({ children, authRequired }: any) => {
  const [user, setUser] = React.useState<IBaseUser>();
  const [userDetails, setUserDetails] = React.useState<IUserInfoResponse>();
  const router = useHistory();

  const logout = (redirectLocation?: string) => {
    TokenService.removeToken();
    ApiCallService.unRegisterAuthToken();
    setUser(undefined);
    setUserDetails(undefined);
    router.push(redirectLocation || '/signin');
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
      router.push('/');
    } catch (error) {
      ApiCallService.unRegisterAuthToken();
      setUser(undefined);
      TokenService.removeToken();
      router.push('/signin');
    }
  };

  React.useEffect(() => {
    const token = TokenService.getToken();
    if (authRequired) {
      if (!token || TokenService.isExpired(token)) {
        logout();
      } else {
        registerToken(token);
        if (!userDetails) {
        }
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
