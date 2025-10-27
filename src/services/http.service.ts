import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { IService, EHttpMethod, IModel_Errorgateway } from "@/types";

class HttpService {
  private http: AxiosInstance;

  constructor() { 
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://placeholder.local";

    this.http = axios.create({
      baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  // Get authorization token for requests
  private get getAuthorization() {
    const accessToken = ""; // Aquí podrías usar Cookies.get("AccessToken")
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Set up request headers
  private setupHeaders(token = "", hasAttachment = false) {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization };
  }

  // Dinámicamente obtener baseURL antes de cada request (opcional)
  private getBaseURL(): string {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "https://placeholder.local";
  }

  // Handle HTTP requests
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      // Actualizar baseURL en runtime
      this.http.defaults.baseURL = this.getBaseURL();

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

  // GET request
  public async get<T>(
    url: string,
    token?: string,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(token, hasAttachment),
    });
  }

  // POST request
  public async push<T, P>(
    url: string,
    token: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(token, hasAttachment),
    });
  }

  // PUT request
  public async update<T, P>(
    url: string,
    token: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(token, hasAttachment),
    });
  }

  // DELETE request
  public async remove<T>(
    url: string,
    token: string,
    params?: IService.IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(token, hasAttachment),
    });
  }

  // Inject interceptors
  private injectInterceptors() {
    this.http.interceptors.request.use((request) => request);
    this.http.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    return Promise.resolve(error);
  }
}

export { HttpService as default };
