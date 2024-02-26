import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// COOKIES
import Cookies from "js-cookie";
// TYPES
import { IService, EHttpMethod, IModel_Errorgateway } from "@/types";

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  // Get authorization token for requests
  private get getAuthorization() {
    const accessToken = "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";//Cookies.get("AccessToken") || "";
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false) {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization };
  }

  // Handle HTTP requests
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      const knownError = error as IModel_Errorgateway.IError_gateway;

      return this.normalizeError(knownError);
    }
  }

  // Perform GET request
  public async get<T>(
    url: string,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform POST request
  public async push<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform UPDATE request
  public async update<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform DELETE request
  public async remove<T>(
    url: string,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress


      return request;
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        // * Do something
        return response;
      },

      (error) => {
        // * Implement a global error alert
        return Promise.reject(error);
      }
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    return Promise.resolve(error);
  }

 
}

export { HttpService as default };