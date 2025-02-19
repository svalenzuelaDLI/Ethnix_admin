//MODELS
export interface INewProduct {
  //general
    sapCode: string;
    description: string;
    subCategory: number;
    barcodeEach: string;
    barCodeCase: string;
    uoMGroup: number;
    brand: string;
    productName: string;
    estimatedArrival: Date;
    developmentYear: number;
    storageType: string;
    properties: {
      code:number;
      name: string;
      deleted:boolean;
    };
    minDaysReceipt: number;
    minDaysDispatch: number;
    urlImage: string;
    imageStatus: number;
    myProperty: string;
    vendor: string;
    vendorItemCode: string;
    purchasingUomCode: number;
    fobCase: number;
    fobUnit: number;
    cifSmyrnaCase: number;
    cifSmyrnaUnit: number;
    leadTime: number;
    suggestedMrg: number;
    suggestedMainListPrice: number;
    suggestedSrp: number;
    mainListPrice: number;
    margin: number;
    shelfLifeDay: number;
    hi: number;
    ti: number;
    casePerPallets: number;
    userId: string;
    sendToMarketing: boolean
  }

export interface IProductUpdate {
  itemId: number;
  sapCode: string;
  description: string;
  subCategory: number;
  barcodeEach: string;
  barCodeCase: string;
  uoMGroup: number;
  salesDefaultUomCode: number;
  brand: number;
  productName: string;
  estimatedArrival: Date;
  developmentYear: number;
  storageType: string;
  properties: [
    {
      code: number;
      name: string;
      deleted: boolean;
    }
  ];
  minDaysReceipt: number;
  minDaysDispatch: number;
  urlImage: string;
  imageStatus: number;
  vendor: string;
  vendorItemCode: string;
  purchasingUomCode: number;
  fobCase: number;
  fobUnit: number;
  cifSmyrnaCase: number;
  cifSmyrnaUnit: number;
  leadTime: number;
  suggestedMrg: number;
  suggestedMainListPrice: number;
  suggestedSrp: number;
  mainListPrice: number;
  margin: number;
  shelfLifeDay: number;
  hi: number;
  ti: number;
  casePerPallets: number;
  userId: string;
  sendToMarketing: boolean
}

export interface IProduct {
  id: number;
  status:number;
  sapCode: string;
  description: string;
  subCategory: number;
  barcodeEach: string;
  barCodeCase: string;
  internalCategory: string;
  uoMGroup: number;
  brand: number;
  productName: string;
  estimatedArrival: Date;
  developmentYear: number;
  properties: [
    {
      id: number;
      itemId: number;
      propertyNum: number;
      propertyName: string;
      deleted: true
    }
  ];
  storageType: string;
  minDaysReceipt: number;
  minDaysDispatch: number;
  urlImage: string;
  imageStatus: 1;
  vendor: string;
  vendorItemCode: string;
  purchasingUomCode: number;
  fobCase: number;
  fobUnit: number;
  cifSmyrnaCase: number;
  cifSmyrnaUnit: number;
  leadTime: number;
  suggestedMrg: number;
  suggestedMainListPrice: number;
  suggestedSrp: number;
  mainListPrice: number;
  margin: number;
  shelfLifeDay: number;
  hi: number;
  ti: number;
  casePerPallets: number;
  binLocation: string;
  rotation: string;
  maxBin: number;
  minBin: number;
  mainListUnitPrice: number;
  diamondFactor: number;
  goldFactor: number;
  silverFactor: number;
  commission: string;
  minimunProfit: number;
  returnReasons: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface IProductFinance{
  itemId: number,
  mainListUnitPrice: number,
  diamondFactor: number,
  goldFactor: number,
  silverFactor: number,
  commission: string,
  minimunProfit: number,
  returnReasons: string,
  userId: string,
  sendToSap: boolean,
}

  export interface ICategories {
    id: number;
    categoryName: string;
  }

  export interface IInternalCategories {
    id: number;
    name: string;
    showInLandingPageDonBeto: string;
  }

  export interface ISubcategories {
    id: number;
    subcategoryName: string;
    categoryId: string;
  }

  export interface IUOMs {
    uomEntry: number;
    uomName: string;
    uomCode: string;
    locked: string;
  }
  export interface IUOMsGroup {
    ugpEntry: number;
    ugpName: string;
    baseUom: number
    ugpCode: string;
    locked: string;
    uoms:  IUOMs[];
  }
  export interface IBrands {
    id: number;
    brandName: string;
  }

  export interface IStorageType {
    id: string;
    storageName: string;
  }

  export interface IVendors {
    vendorId: string;
    vendorName: string;
    leadTime: number
    bonificables: string;
  }

  export interface IProperties {
    code: number;
    name:string;
  }
//HTTP METHODS
//crear producto
export interface createNewProduct{

}
    //Actualizar producto
    export interface updateNewProduct{

    }

     //Actualizar producto a cualquier estado
     export interface updateNewProductStatus{
      itemId: number;
      itemStatus: number;
      userId:string
    }  

     //Cargar imagen a repo
     export interface uploadImage{
      Image: File;
    }  

     //Actualizar producto a Marketing
     export interface updateNewProductToMarketing{
      userId:string
      itemId: number,
      developmentYear: number,
      internalCategory: string,
      sendToFinance: boolean
    }  

     //Actualizar producto a Finanzas
     export interface updateNewProductToFinancials{
      internalCategory:string;

      userId:string;

    }   

//Actualizar producto a SAP
export interface updateNewProducttoSAP{
  productId: number; 
  sendToSap: boolean;      
  sendNotification: boolean;
  userId:string
} 


    //HTTP  RESPONSE DATA

    export interface IDataMaster {
      totalRecords: number;
      totalPage: number;
      currentPage: number;
      pageSize:number;
      //data: INewProducts[]; se coloca por herencia
    }
    // IData inherits property from IDataMaster
    interface IDataNewProducts extends IDataMaster {
      data: INewProduct[]; 
    }
   

//HTTP RESPONSES


//Master RESPONSE
 interface MasterResponse {
  succeeded: boolean;
  errorCode: number;
  errorMessage: string;
  validationErrors:string[];
}
//Solicitar lista de  productos
// getNewCustomers inherits property from MasterResponse
export interface getNewProducts extends MasterResponse {
  data: IDataNewProducts;
}

//Solicitar producto en especifico
export interface getNewProduct extends MasterResponse {
  data: INewProduct;
}

//Solicitar lista de categorias   //Directo a interfaz
export interface getCategories extends MasterResponse {
  data: ICategories[];
}
//Solicitar lista de categorias   //Directo a interfaz
export interface getInternalCategories extends MasterResponse {
  data: IInternalCategories[];
}

//Solicitar lista de subcategorias   //Directo a interfaz
export interface getSubcategories extends MasterResponse {
  data: ISubcategories[];
}

//Solicitar lista de uoms   //Directo a interfaz
export interface getUOMs extends MasterResponse {
  data: IUOMs[];
}

//Solicitar lista de marcas   //Directo a interfaz
export interface getBrands extends MasterResponse {
  data: IBrands[];
}


//Solicitar lista de uoms GROUP  //Directo a interfaz
export interface getUOMsGroup extends MasterResponse {
  data: IUOMsGroup[];
}

//Solicitar lista de Vendors //Directo a interfaz
export interface getVendors extends MasterResponse {
  data: IVendors[];
}

//Solicitar lista de marcas   //Directo a interfaz
export interface getStorageType extends MasterResponse {
  data: IStorageType[];
}