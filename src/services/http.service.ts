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