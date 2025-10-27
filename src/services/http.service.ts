import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// COOKIES
import Cookies from "js-cookie";
// TYPES
import { IService, EHttpMethod, IModel_Errorgateway } from "@/types";

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  console.log(baseURL);
  
  constructor() { 
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  // Get authorization token for requests
  private get getAuthorization() {

    const accessToken ="ijy0TtLbtWvF7WyIoaYL+OgckXLEJ18zeAfJtez0LRvro2Acm2cSBD3/umecdJUNwF+jfVcKV0Bszf5IWCVy45PwDtSv0XRBLSyP9+lmUhW7w+9zEuQgj2n5c/Ft7Z0R0vuYLOM8c/aEAveFboFjuMGchFzD4whSgPr7OjCXHf4FzhwLeQwW9s3qMmFw71jgkcPkLAz3NtgSoWiNkV3c7DTGOP0k95e7LSgZUhTaRXhxuezxSp9s3eHRp7/xFKMTMmkfV9sEcH8zHlEtjmcCyLk7dLQ3eWSi1abSp52ErvKDdF6oWdKufW3KJ3e5Nl+2C+BG3H+fe6df49MNvuvZLrvbXHJN8dWM0HmHYR1fB0OF+G0PxEXBcKdt3fF5eZBvNxKAUqscfdk+6yN7kFDWcl3Tt8LT4FeFveqLS//zl+/maRufSZu3FTBGfp+UJtzp";//Cookies.get("AccessToken") || "";
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
