import {
  buildURL,
  transFormRequest,
  processHeaders,
  transformResponse,
} from '../helpers';
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import xhr from './xhr';
export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config);
  return xhr(config).then((res) => {
    return transformResponseData(res);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}
