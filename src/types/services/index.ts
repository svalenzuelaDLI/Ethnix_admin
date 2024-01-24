export interface IParams {
    [key: string]: any;
  }
  
  export interface IGenericOptions {
    url: string;
    params?: IParams;
  }
  
  export interface IErrorResponse { // *Esto puede depender de la respuesta de nuestro servidor (el backend)
    status: string;
    message: string;
  }