/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line no-underscore-dangle
export const CONTENT_TYPE = 'application/json; charset=utf-8';

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

export function ApiCallBuilder(url?: string, data?: any, headers?: any) {
  this._construct();
  if (url) {
    this._request.url = url;
  }
  if (data) {
    this._request.data = data;
  }
  if (headers) {
    this._request.header = headers;
  }
}
ApiCallBuilder.prototype._construct = function() {
  this._request = {} as RequestObject;
  this._request.header = {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  };
  this._setMethod = function(method: RequestMethod) {
    this._request.method = method;
  };
};
ApiCallBuilder.prototype.setUrl = function(url: string) {
  this._request.url = url;
  return this;
};

ApiCallBuilder.prototype.setParams = function(params: any) {
  Object.defineProperty(this._request, 'params', {
    value: params,
    writable: false,
    enumerable: true,
  });
  return this;
};

ApiCallBuilder.prototype.setData = function(data: any) {
  Object.defineProperty(this._request, 'data', {
    value: data,
    writable: false,
    enumerable: true,
  });
  return this;
};

ApiCallBuilder.prototype.setHeader = function(header: any) {
  Object.defineProperty(this._request, 'header', {
    value: header,
    writable: false,
    enumerable: true,
  });
  return this;
};

ApiCallBuilder.prototype.setDataType = function(dataType: any) {
  Object.defineProperty(this._request, 'dataType', {
    value: dataType,
    writable: false,
    enumerable: true,
  });
  return this;
};

ApiCallBuilder.prototype.setCache = function(cache: boolean) {
  Object.defineProperty(this._request, 'cache', {
    value: cache,
    writable: false,
    enumerable: true,
  });
  return this;
};

ApiCallBuilder.prototype.get = function() {
  this._setMethod('GET');
  Object.freeze(this._request);
  return this._request;
};

ApiCallBuilder.prototype.post = function() {
  this._setMethod('POST');
  Object.freeze(this._request);
  return this._request;
};

ApiCallBuilder.prototype.put = function() {
  this._setMethod('PUT');
  Object.freeze(this._request);
  return this._request;
};

ApiCallBuilder.prototype.delete = function() {
  this._setMethod('DELETE');
  Object.freeze(this._request);
  return this._request;
};
