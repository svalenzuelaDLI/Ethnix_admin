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

    const accessToken ="SFbKVMtZ6RcSkV3wtqUKAqITBSjbGPhWmKu0yb4mpqUC2TKbHhYvRoHeyK92RiNs9Eu2jt9pQbxY4jP8LvcfpLWymD2jkUNU82A/l/9Af8PuFwvYzpwDPOUjeqpn+0+h/WlLiWJni4c24khloa90xwVFBW+cvlycHY6piOEvEvo+nlTG45twyKrZfC3NNonlfhytyTLtrokPcTAu0h04cfQ9neY4mQmGtfsaR/B1SDSY9OFMBRgh3Ne8dLX3AhDRJe3B3s71COWn01qoi+fFM8fdaVHQKRT1O0boWFYdz2EhtS6mR1Xz/P3LWZQ/VsYfjST6RVbEU+HJe53oZsfcxZ/R6iKVHiSnAy2RPky+hFRz1wSIHgjsXjlfkY/CV1lK0QiVkA2hjgoCbZRodYNTCZMicjcol4IeWhiVAdfrnb2CS2xakoc788aQdvSLY9mK";//Cookies.get("AccessToken") || "";
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