import axios from 'axios';
import { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';

export function getEndpoint(path = '/') {
  return `${process.env.NEXT_PUBLIC_NEWSFEED_API}/${path}`;
}

export function getCommonHeaders(
  authToken?: string | null
): AxiosRequestHeaders {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: '*/*',
    //'Accept-Encoding': 'gzip, deflate, br',
    //Connection: 'keep-alive',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
}

export async function callApiService<Data>(
  requestOptions: AxiosRequestConfig,
  authToken?: string | null
): Promise<Data> {
  const { headers, ...others } = requestOptions;
  try {
    const response = await axios({
      headers: { ...getCommonHeaders(authToken), ...(headers || {}) },
      ...others,
    });
    return response.data as Data;
  } catch (e) {
    console.log('E', e);
    throw new Error(e as string);
  }
}
