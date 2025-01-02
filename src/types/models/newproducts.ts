//MODELS
export interface INewProduct {
    id: number;
    status: number;
    productName: string;
    description: string;
    subcategory: string;
    barcode:number;
    uom:string,
    barcodecase:string;
    brand: string;
    sapcode:string;
    arrivaldate:Date;
    developmentyear:string;
    itemcodeVendor:string;
    itemcodePurchase:string;
    FOBCase:number;
    FOBUnit:number;
    CIFNashCase: number;
    CIFNashUnit:number;
    DeliveryTimeDays:number
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

  export interface IBrands {
    id: number;
    brandName: string;
  }


//HTTP METHODS
    //Actualizar producto
    export interface updateNewProduct{

    }

     //Actualizar producto a cualquier estado
     export interface updateNewProductStatus{
      productId: number,
      productStatus: number,
      userId:string
    }  

     //Cargar imagen a repo
     export interface uploadImage{
      Image: File,
    }  

     //Actualizar producto a Ventas
     export interface updateNewProductToSales{
      productId: number,
      approved: boolean,
      sendNotification: boolean,
      userId:string
    }  

     //Actualizar producto a Inventario
     export interface updateNewProductToInventory{
      productId: number,
      sendNotification: boolean,
      userId:string,

    }   

//Actualizar producto a SAP
export interface updateNewCustomertoSAP{
  productId: number, 
  sendToSap: boolean,      
  sendNotification: boolean,
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

