import axios from 'axios';
import { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';

export function getEndpoint(path = '/') {
  return `${process.env.NEXT_PUBLIC_NEWSFEED_API}/${path}`;
}

export function getCommonHeaders(): AxiosRequestHeaders {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    //'Accept-Encoding': 'gzip, deflate, br',
    //Connection: 'keep-alive',
  };

  return headers;
}

export async function callApiService<Data>(
  requestOptions: AxiosRequestConfig
): Promise<Data> {
  const { headers, ...others } = requestOptions;
  try {
    const response = await axios({
      headers: { ...getCommonHeaders(), ...(headers || {}) },
      ...others,
    });
    return response.data as Data;
  } catch (e) {
    console.log('E', e);
    throw new Error(e as string);
  }
}
