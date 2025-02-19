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

    const accessToken ="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";//Cookies.get("AccessToken") || "";
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  // Set up request headers
  private setupHeaders(token = "", hasAttachment = false ) {

    //console.log("TOKEN BEBE",token)
     //const tokenEthnix={ Authorization: `Bearer ${token}` } 
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization };//...this.getAuthorization };
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
    token?:string,
    params?: IService.IParams,
    hasAttachment = false,
   
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(token,hasAttachment),
    });
  }

  // Perform POST request
  public async push<T, P>(
    url: string,
    token:string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(token, hasAttachment),
    });
  }

  // Perform UPDATE request
  public async update<T, P>(
    url: string,
    token:string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(token,hasAttachment),
    });
  }

  // Perform DELETE request
  public async remove<T>(
    url: string,
    token:string,
    params?: IService.IParams,
    hasAttachment = false,
 
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(token,hasAttachment),
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