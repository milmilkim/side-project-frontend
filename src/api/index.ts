import { ApiResponse } from '@/types/CommonApi';
import ServerError from '@/lib/ServerError';
import { postToDiscord } from '@/lib/utils';

const headers = {
  'Content-Type': 'application/json',
};

const baseURL = '환경변수에서 가져오기';

const wrappedFetch = async <T = unknown, U = unknown>(
  url: string,
  data?: T,
  options?: RequestInit
): Promise<ApiResponse<U>> => {
  const resolveUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

  try {
    postToDiscord(`API 요청: ${data ? JSON.stringify(data) : ''}`);

    const response = await fetch(resolveUrl(url), {
      body: JSON.stringify(data),
      ...options,
      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
      cache: options?.cache || 'no-store',
      next: options?.next?.revalidate
        ? { revalidate: options?.next.revalidate }
        : undefined,
    });

    if (response.ok) {
      const data = (await response.json()) as ApiResponse<U>;
      postToDiscord(`API 응답: ${JSON.stringify(data)}`);
      return data;
    } else {
      throw new ServerError('서버에서 응답을 받지 못했습니다.', 500);
    }
  } catch (error) {
    if (error instanceof ServerError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ServerError(error.message, 500);
    } else {
      throw new ServerError('알 수 없는 에러가 발생했습니다.', 500);
    }
  }
};

const api = {
  get: <T extends Record<string, unknown>, U = unknown>(
    url: string,
    params?: T
  ) => {
    const searchParams = params
      ? new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
            {}
          )
        ).toString()
      : '';

    const urlWithParams = searchParams ? `${url}?${searchParams}` : url;

    return wrappedFetch<void, U>(urlWithParams, undefined, { method: 'GET' });
  },

  post: <T = unknown, U = unknown>(url: string, data: T) =>
    wrappedFetch<T, U>(url, data, { method: 'POST' }),

  put: <T = unknown, U = unknown>(url: string, data: T) =>
    wrappedFetch<T, U>(url, data, { method: 'PUT' }),

  delete: (url: string) => wrappedFetch(url, undefined, { method: 'DELETE' }),
};

export default api;
