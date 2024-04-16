//MODELS
export interface IContacts {
    id: number;
    customerId: number;
    firstName: string;
    lastName:string;
    position: string;
    contactPhone: string,
    email: string,
    deleted: boolean;
  }

  export interface IProperties {
    id: number;
    customerId: number;
    propertyNum: number;
    propertyName:string;
    deleted: boolean;
  }

  export interface ISchedulers {
    id: number;
    customerId: number;
    week: number;
    day:number;
    type: number;
    deleted:boolean;
  }

  export interface ISchedulersUpdate {
    weekNum: number;
    dayNum: number;
    id: number;
    deleted:boolean;
  }

  export interface INotificationPost {
    customerStatus: number;
    email: string;
    isUser: boolean;
    tokenFcm:string;
    job:string;
    name:string;
  }



export interface INewCustomer {
    id: number;
    status: number;
    contacts: IContacts[];
    schedulers: ISchedulers[];
    properties: IProperties[];
    customerName: string;
    storePhone: string;
    storeEmail: string;
    siteWeb: string;
    federalTax: string;
    federalTaxImgeUrl: string;
    resalesTaxCertificate: string,
    resalesTaxCertificateImageUrl: string,
    commercialAgreement: string,
    street: string,
    city: string,
    zipCode: string,
    state: string,
    country: string,
    priceList: number,
    fatherCard: string,
    operationTime: string,
    receivingDays: string,
    receivingZone: string,
    loadingDock: boolean,
    isRiteFill: boolean,
    salesRepId: number,
    supervisorId: number,
    salesRouteId: string,
    salesRouteName: string,
    billWithBarcode: boolean,
    budget: number,
    visitFrequency: string,
    deliveryRouteId: string,
    deliveryRouteName: string,
    deliveryWhs: string,
    accommodateDairy: boolean,
    supportTrailerFldValue: string,
    salesRepName: string,
    supervisorName: string,
    supportTrailerDesc: string,
    paymentTermName: string,
    sapCardCode: string,
    paymentTermGrpNum: number,
    creditLimit: number,
    freightIncome: boolean,
    createDate: Date,
    updateDate: Date,
    createTime: string,
    updateTime: string,
    createUserId: string,
    lastUpdateUserId: string,
    payWithCreditCard: boolean,
    isSeparatedInvoices: boolean,
  }


  export interface ISAPCustomer {
    cardCode: string;
    cardName: string;
    fatherCard: string;
    isFather: boolean;
  }


  export interface IPropertiesServices {
    code: number;
    name:string;
  }

  export interface ISalesReps {
    id: number;
    name: string;
    catCommision: number;
    supervisorId: number;
    email: string;
  }

  export interface ISupervisors {
    id: number;
    name: string;
    zone: string;
    area: string;
    active: string;
  }
  export interface ISalesRoutes {
    code: string;
    name: string;
    active: string;
    zone: string;
  }
  export interface IDeliveryRoutes {
    code: string;
    name: string;
    active: string;
    zone: string;
    whereHouse: string;
  }
  export interface ITrucks {
    fldValue: string;
    descr: string;
  }
  export interface IPaymentTerms {
    groupNum: number;
    pymntGroup: string;
    extraDays: number;
  }
  export interface IPriceList {
    listNum: number;
    listName: string;
    baseNum: number;
    factor: number;
    active: string;
    currency: string;
  }

  //New customers notifications

  export interface INotifications {
    id: number;
    customerStatus: number;
    email: string;
    job: string;
    name: string;
  }



//HTTP METHODS
    //Actualizar cliente
    export interface updateNewCustomer{
      properties: IProperties[] | undefined,
      contacts: IContacts[] | undefined,
      id: number,
      priceList: number,
      fatherCard: string,
      customerName: string,
      storePhone: string,
      storeEmail: string,
      siteWeb: string,
      federalTax: string,
      federalTaxImgeUrl: string,
      resalesTaxCertificate: string,
      resalesTaxCertificateImageUrl: string,
      commercialAgreement: string,
      street: string,
      city: string,
      zipCode: string,
      state: string,
      country: string,
      operationTime: string,
      receivingDays: string,
      receivingZone: string,
      userId: string,
      loadingDock: boolean
    }

     //Actualizar cliente a cualquier estado
     export interface updateNewCustomerStatus{
      customerId: number,
      customerStatus: number,
      userId:string
    }  

     //Cargar imagen a repo
     export interface uploadImage{
      ResalesTaxCertificateImage: File,
      FederalTaxImge:File,
    }  

     //Actualizar cliente a Commercial
     export interface updateNewCustomertoRevision{
      customerId: number,
      approved: boolean,
      sendNotification: boolean,
      userId:string
    }  

     //Actualizar cliente a Operaciones
     export interface updateNewCustomertoCommercial{
      customerId: number,
      salesRepId: number,
      supervisorId: number,
      salesRouteId: string,
      billWithBarcode: boolean,
      isRiteFill: boolean,
      sendNotification: boolean,
      budget:number,
      schedulers: ISchedulersUpdate[] | undefined,
      visitFrequency: string,
      priceList: number,
      fatherCard: string,
      userId:string,
      PayWithCreditCard: boolean,
      IsSeparatedInvoices: boolean
    }   

         //Actualizar cliente a Finanzas
         export interface updateNewCustomertoOperations{
          customerId: number,
          deliveryRouteId: string,
          supportTrailerValue: string,
          accommodateDairy: boolean,      
          sendNotification: boolean,
          preparationScheduler: ISchedulersUpdate[] | undefined,
          deliverycheduler:ISchedulersUpdate[] | undefined,
          userId:string
        }   
//Actualizar cliente a SAP
export interface updateNewCustomertoFinantials{
  customerId: number,
  creditLimit: number,
  freightIncome: boolean, 
  sendToSap: boolean,      
  sendNotification: boolean,
  paymentTermGroupNum: string,
  userId:string
} 


    //HTTP  RESPONSE DATA

    export interface IDataMaster {
      totalRecords: number;
      totalPage: number;
      currentPage: number;
      pageSize:number;
      //data: INewCustomer[]; se coloca por herencia
    }
    // IData inherits property from IDataMaster
    interface IDataNewCustomers extends IDataMaster {
      data: INewCustomer[]; 
    }
    interface IDataSAPCustomers extends IDataMaster {
      data: ISAPCustomer[]; 
    }
        interface IDataSalesReps extends IDataMaster {
      data: ISalesReps[]; 
    }
    interface IDataSalesSupervisors extends IDataMaster {
     data: ISupervisors[]; 
    }
    interface IDataSalesRoutes extends IDataMaster {
     data: ISalesRoutes[]; 
    }    
    interface IDataDeliveryRoutes extends IDataMaster {
      data: IDeliveryRoutes[]; 
    }     
    interface IDataPaymentTerms extends IDataMaster {
      data: IPaymentTerms[]; 
    }     

    interface IDataPriceList extends IDataMaster {
      data: IPriceList[]; 
    }

//HTTP RESPONSES


//Master RESPONSE
 interface MasterResponse {
  succeeded: boolean;
  errorCode: number;
  errorMessage: string;
  validationErrors:string[];
}
//Solicitar lista de  clientes
// getNewCustomers inherits property from MasterResponse
export interface getNewCustomers extends MasterResponse {
  data: IDataNewCustomers;
}

//Solicitar cliente en especifico
export interface getNewCustomer extends MasterResponse {
  data: INewCustomer;
}

//Solicitar lista de propiedades - servicios   //Directo a interfaz
export interface getPropertiesServices extends MasterResponse {
  data: IPropertiesServices[];
}

//Commercial
//Solicitar lista de vendedores
export interface getSalesReps extends MasterResponse {
  data: IDataSalesReps;
}
//Solicitar lista de supervisores
export interface getSalesSupervisors extends MasterResponse {
  data: IDataSalesSupervisors;
}
//Solicitar lista de rutas de venta
export interface getSalesRoutes extends MasterResponse {
  data: IDataSalesRoutes;
}

//Operations
//Solicitar lista de rutas de despacho
export interface getDeliveryRoutes extends MasterResponse {
  data: IDataDeliveryRoutes;
}
//Solicitar lista de tipos camiones
export interface getTrucks extends MasterResponse { //Directo a interfaz
  data: ITrucks[];
}
//Solicitar lista de terminos de pago
export interface getPaymentTerms extends MasterResponse {
  data: IDataPaymentTerms;
}
//Solicitar lista de precios
export interface getPriceList extends MasterResponse {
  data: IDataPriceList;
}

//Solicitar lista de clientes en SAP (lista padres)
export interface getSAPCustomers extends MasterResponse {
  data: IDataSAPCustomers;
}

//Solicitar configuracion de notificaciones o correos configurados 
export interface getNotifications extends MasterResponse {
  data: INotifications[];
}