export interface IContacts {
    id: number;
    customerId: number;
    firstName: string;
    lastName:string;
    position: string;
    contactPhone: string,
    email: string,
  }

  export interface IProperties {
    id: number;
    customerId: number;
    propertyNum: number;
    propertyName:string;
  }

  export interface ISchedulers {
    id: number;
    customerId: number;
    week: number;
    day:number;
    type: number;
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
    street: string,
    city: string,
    zipCode: string,
    state: string,
    country: string,
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
    lastUpdateUserId: string
  }