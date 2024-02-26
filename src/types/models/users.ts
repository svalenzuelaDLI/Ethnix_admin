//MODELS
export interface ISignin {
    userName: string;
    password: string;
    includePermissions: boolean;
    includeRoles: boolean;
    includeUserFields: boolean;
  }

  export interface IPermissions {
    id: number;
    name: string;
    description: string;
    action: string;
    path: string;
    method: string;
    controller: string;
    aplicacionName: string;
    roleId: number;
  }
  export interface IRoles {
    id: number;
    name: string;
    description: string;
  }
  export interface IUserFields {
    id: number;
    name: string;
    description: string;
    value: string;
  }

  export interface IDataUser{
    id: number,
    userName: number,
    token:string,
    phone:string,
    email:string,
    permissions:IPermissions[],
    roles:IRoles[],
    userFields:IUserFields[],
}  
      //HTTP  RESPONSE DATA//Master RESPONSE
 interface MasterResponse {
    succeeded: boolean;
    errorCode: number;
    errorMessage: string;
    validationErrors:string[];
  }

//Solicitar usuario
export interface getLoggedinuser extends MasterResponse {
    data: IDataUser;
  }