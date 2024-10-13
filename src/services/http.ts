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

class Http {
  baseURL: string;
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }
  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }
  initHttp() {
    const http = axios.create({
      baseURL: this.baseURL,
      headers,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;

    return http;
  }

  request<T = unknown, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
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
const http = new Http("https://667b1a30bd627f0dcc91b421.mockapi.io")
export default http;
