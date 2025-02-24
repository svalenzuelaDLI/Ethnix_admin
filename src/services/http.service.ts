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

    const accessToken ="xwsZV3hwUyvAr8/P8pFvwq45NDGsHxTMjhcUJGYVnLcIH/6VusIHJxhS2Tr4RoiZhAWgbIOLBc3GdopETy+avgO0B8e8k+i4nv7D3ZUAy6vo+W2z4KdNxMgJDyiLa1K21qdMP2Hnq7G4jJlInGPg1DQun4fp92Vthc5nEaC7bI/NbRvpRRmuz/xNAPyVeFFs2Q+pF1AR+XYU+mC6/9O7qFMpNv5vzqiTG7i6njQMEO4nTSNr5k+YesKE/vopzHCOId2v5Djr2xuONRFPBYnlyiczLAsHdVr10McYq7hdgs7BQ8IXqNxuqv2mBAgxz886h+rNSHu37xAkKuAv2lWJVbXWXN5JA+1tbI6jBaJjPmewP4LU/K5PQO6fGniipUDVGAgZc40U0+nOXbMv+tijCAW0UMefrcz0Thn6euqyoQT+1pDeZ0FjzoKMk+YDueXq";//Cookies.get("AccessToken") || "";
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