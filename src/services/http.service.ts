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