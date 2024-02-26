export interface IError_gateway {
    code: string;
    message: number;
    response: IResponse;
  }

  export interface IResponse {
    status: number;
    statustext: string;
    data: IResponseAPI
  }

  export interface IResponseAPI{
    succeeded: boolean;
    errorCode: number;
    errorMessage: string;
    validationErrors: string[];
  }

  export interface IResponseAPI_notifications extends IResponseAPI{
    data: boolean;
  }


  export interface IResponseAPI_uploadimage{
    succeeded: boolean;
    errorCode: number;
    errorMessage: string;
    validationErrors: string[];
    data: IResponse_uploadimage
  }

  export interface IResponse_uploadimage{
    federalTaxImgeUrl: string;
    resalesTaxCertificateImageUrl: string; 
  }


  export interface IResponseAPI_signin extends IResponseAPI{
    data: IResponseAPI;
  }