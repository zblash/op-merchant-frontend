import Axios, { AxiosError } from 'axios';
import { ApiCallBuilder } from '@/utils/api/ApiCall/api-call-builder';
import { IExceptionResponse } from '@/utils/api/api-models';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface RequestObject {
  url: string;
  data?: any;
  contentType?: string;
  method: RequestMethod;
  dataType?: any;
  cache?: boolean;
  header: any;
  params?: any;
}

export function catchAxiosError(err: AxiosError): IExceptionResponse {
  let message = 'Something happened in setting up the request that triggered an Error';
  // eslint-disable-next-line no-console
  console.log(err.response);
  if (err.response) {
    return err.response.data;
  }
  if (err.request) {
    message = 'The request was made, but no response was received';
  }

  return {
    message,
    status: '404',
    path: '',
    subErrors: undefined,
    timestamp: new Date(),
  };
}

const ApiCallService = (function() {
  const isProduction = process.env.NODE_ENV === 'production';
  let authInterceptorID: number;

  const api = Axios.create({
    baseURL: isProduction ? process.env.BACKEND_URL : 'https://api.onlineplasiyer.com/',
  });

  const registerAuthToken = (token: string) => {
    authInterceptorID = api.interceptors.request.use(config => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `bearer ${token}`;

      return config;
    });
  };
  const unRegisterAuthToken = () => {
    api.interceptors.request.eject(authInterceptorID);
  };

  function request(requestObj: RequestObject) {
    return api({
      method: requestObj.method,
      params: requestObj.params,
      url: requestObj.url,
      data: requestObj.data,
      headers: requestObj.header,
    })
      .then(response => response.data)
      .catch(error => {
        throw catchAxiosError(error);
      });
  }

  return { registerAuthToken, unRegisterAuthToken, request };
})();

/**
 * @constructor
 * @this ApiCall
 */
function ApiCall(url?: string, data?: any, headers?: any) {
  ApiCallBuilder.call(this, url, data, headers);
}

ApiCall.prototype = Object.create(ApiCallBuilder.prototype);

ApiCall.prototype.setUrl = function(url: string, isPrivate = true) {
  this._request.header = {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  };
  this._request.url = isPrivate ? process.env.PRIVATE_API_PREFIX + url : url;

  return this;
};

ApiCall.prototype.setHeader = function(header: any) {
  Object.defineProperty(this._request, 'header', {
    value: header,
    writable: true,
    enumerable: true,
  });

  return this;
};

export { ApiCall, ApiCallService };
