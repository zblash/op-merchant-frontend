/* eslint-disable import/extensions */
import axios from 'axios';
import { TOKEN_KEY } from '~/utils/constants';

export const TOKEN = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  remove: () => localStorage.removeItem(TOKEN_KEY),
};

export const URL = 'https://api.onlineplasiyer.com/';
const API_URL = `${URL}/private`;

const headers = (contentType = 'application/json') => ({
  Authorization: TOKEN.get(),
  'Content-Type': contentType,
  'Accept-Language': 'tr',
});
const ApiCall = {
  post: (route: string, params = {}) =>
    axios
      .post(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data),

  get: (route: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: headers(),
        params,
      })
      .then(d => d.data),
  getFile: (route: string, fileType: string, params = {}) =>
    axios
      .get(API_URL + route, {
        headers: headers(fileType),
        params,
        responseType: 'blob',
      })
      .then(d => {
        const blob = new Blob([d.data], { type: fileType });

        return blob;
      }),

  delete: (route: string, params: {} = {}) =>
    axios
      .delete(API_URL + route, {
        params,
        headers: headers(),
      })
      .then(d => d.data),

  put: (route: string, params: any) =>
    axios
      .put(API_URL + route, params, {
        headers: headers(),
      })
      .then(d => d.data),
};

function login(username: string, password: string) {
  return axios.post(`${URL}/merchant/login`, { username, password }).then(({ data }) => {
    TOKEN.set(`Bearer ${data.token}`);
    // eslint-disable-next-line
    location.replace('/');

    return data;
  });
}
function signup(data: {
  cityId: string;
  stateId: string;
  details: string;
  name: string;
  username: string;
  email: string;
  password: string;
  taxNumber: string;
  phoneNumber: string;
  activeStates: string[];
}) {
  return axios.post(`${URL}/merchant/register`, data).then(d => d.data);
}

function logout() {
  TOKEN.remove();
  // eslint-disable-next-line
  location.replace('/');
}
const hasToken = !!TOKEN.get();

export { ApiCall, login, logout, hasToken, signup };
