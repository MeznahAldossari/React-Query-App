import { StatusCodes } from "@/types/enums";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  try {
    //const { headers, method } = config;

    if (globalThis) {
      const token = globalThis.localStorage?.getItem("accessToken");
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  } catch (error) {
    throw (error as Error).message;
  }
};

class Https {
  baseURL: string;
  private instance: AxiosInstance | null = null;

  private get https(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }
  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }
  initHttp() {
    const https = axios.create({
      baseURL: this.baseURL,
      headers,
      // withCredentials: true,
    });

    https.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    https.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = https;

    return https;
  }

  request<T = unknown, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.https.request(config);
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.https.get<T, R>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.https.post<T, R>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.https.put<T, R>(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.https.delete<T, R>(url, config);
  }

  // handle generic app errors depending on the status code
  private handleError(error: AxiosError) {
    if (!error) return;

    const { status } = error;

    switch (status) {
      case StatusCodes.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCodes.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCodes.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCodes.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

const https = new Https("https://665736969f970b3b36c8658a.mockapi.io");
export default https;
