import Axios, { AxiosError } from 'axios';
import { IExceptionResponse } from '../api-models';
import { ApiCallBuilder } from './api-call-builder';

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
  let authInterceptorID: number;

  const api = Axios.create({
    baseURL: 'https://api.onlineplasiyer.com',
  });

  const registerAuthToken = (accessToken: string) => {
    authInterceptorID = api.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      },
      (error: any) => {
        console.log(error);
      },
    );
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

function ApiCall(url?: string, data?: any, headers?: any) {
  ApiCallBuilder.call(this, url, data, headers);
}

ApiCall.prototype = Object.create(ApiCallBuilder.prototype);

ApiCall.prototype.setUrl = function(url: string, isPrivate = true) {
  this._request.header = {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  };
  this._request.url = isPrivate ? `private${url}` : url;

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
