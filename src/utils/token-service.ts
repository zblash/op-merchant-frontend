/* eslint-disable camelcase */
import Cookies from 'universal-cookie';
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from 'jwt-decode';
import { IBaseUser } from './api/api-models';

const TokenService = (function() {
  function saveToken(token: string) {
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
  }

  function getToken(): string {
    const cookies = new Cookies(null);

    return cookies.get('token');
  }

  function removeToken() {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
  }

  function decodeToken(token: string): IBaseUser | undefined {
    if (!token) {
      return undefined;
    }

    return jwt_decode(token) as IBaseUser;
  }

  function isExpired(token: string): boolean {
    try {
      const user = decodeToken(token);
      if (user) {
        return new Date() > new Date(user.exp * 1000);
      }
    } catch (e) {
      return false;
    }

    return false;
  }

  return { saveToken, getToken, removeToken, decodeToken, isExpired };
})();

export default TokenService;
