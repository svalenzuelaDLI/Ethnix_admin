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