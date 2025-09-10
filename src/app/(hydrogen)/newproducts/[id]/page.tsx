"use client";
import { PiDownloadSimpleBold } from 'react-icons/pi';
import NewProductsDetails from '@/app/shared/newproducts/newproducts-details';
import PrintButton from '@/app/shared/print-button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button, Select , Text} from 'rizzui';
import { routes } from '@/config/routes';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import GeneralErrorCard from '@/components/cards/general-error-card';

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewProducts, IModel_Errorgateway } from "@/types";
import { statusProduct,statusProductPurchasing,statusProductMarketing,statusProductFinances } from '@/app/shared/newcustomers/select-options';
//SESSION

const pageHeader = {
  title: 'New Product Details',
  breadcrumb: [
    {
      href: routes.newproducts.home,
      name: 'Home',
    },
    {
      href: routes.newproducts.home,
      name: 'New Products',
    },
    {
      name: 'Details',
    },
  ],
};

export default function NewProductsDetailsPage({ params }: any) {


  const http = new HttpService();
  const [newproduct, setNewProduct] = useState<IModel_NewProducts.IProduct>();
  const [loading, setLoading] = useState(true);
  const [statusselected, setStatusSelected] = useState(0);
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);
//

const [subcategories, setSubcategories] = useState<{value: string, label:string, categoryId:string}[]>([]);
  const [brands, setBrands] = useState<{value: string, label:string}[]>([]);
  const [uoms, setUoms] = useState<{value: string, label:string}[]>([]);
  const [uomsGroup, setUomsGroup] = useState<{value: string, label:string}[]>([]);

  const [vendors, setVendors] = useState<{value: string, label:string}[]>([]);
  const [storagetype, setStorageType] = useState<{value: string, label:string}[]>([]);

  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);
  const [internalcategories, setInternalCategories] = useState<{value: string, label:string}[]>([]);


  const { push } = useRouter();

  const spoolSubcategories = async () => {   
      const response = await http.service().get<IModel_NewProducts.getSubcategories>(`/items/v2/subcategories`);
      
      if (response?.data) {
        if(response?.data.data.length>0){
  
        const pricel = response?.data.data
          ? response.data.data.map((item) => ({
              ...{value: item.id.toString(), label:item.subcategoryName, categoryId:item.categoryId},
            }))
          : [];
  
          setSubcategories(pricel)
      }
      }
    };

        
  const spoolUOMRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getUOMs>(`/items/v2/items/uoms`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.uomEntry.toString(), label:item.uomName},
          }))
        : [];

        setUoms(pricel)
    }
    }
  };

  const spoolUOMGroupRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getUOMsGroup>(`/items/v2/items/UomGroups`,"",{IncludeUoms:true,PageSize:250});
      if (response?.data) {
      if(response?.data.data.length>0){

      const uomgroups = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.ugpEntry.toString(), label:item.ugpName, uoms: item.uoms},
          }))
        : [];

        console.log("UOM GROUPS", uomgroups)
        setUomsGroup(uomgroups)
    }
    }
  };  

  const spoolVendorsRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getVendors>(`/items/v2/items/AppLimena/Vendors`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const vendors = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.vendorId, label: item.vendorId + " " + item.vendorName},
          }))
        : [];

        setVendors(vendors)
    }
    }
  };  

  const spoolStorageTypeRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getStorageType>(`/items/v2/StorageType`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const storages = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id, label: item.storageName},
          }))
        : [];

        setStorageType(storages)
    }
    }
  };  

  const spoolBrandsRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getStorageType>(`/items/v2/brands`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id.toString(), label:item.brandName},
          }))
        : [];

        setBrands(pricel)
    }
    }
  };

    const spoolInternalCategories = async () => {   
      console.log("entrando al fetch categories") 
        const response = await http.service().get<IModel_NewProducts.getInternalCategories>(`/items/v2/InternalCategories`);
        
        console.log(response)
        if (response?.data) {
          if(response?.data.length>0){
    
          const categ = response?.data
            ? response.data.map((item) => ({
                ...{value: item.id.toString(), label:item.name},
              }))
            : [];
    
            setInternalCategories(categ)
        }
        }
      };

  const spoolNewProductRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/v2/items/AppLimena`,"",{ Filter: "x.id=" + params.id, IncludeEthnicies:true });
    console.log(response)
    if (response?.data) {
      setNewProduct(response.data.data[0]);    
    } 
  };



  

  useEffect( () => {
    spoolSubcategories()
    spoolUOMRecords()
    spoolUOMGroupRecords()
    spoolBrandsRecords()
    spoolVendorsRecords()
    spoolInternalCategories()
    //spoolStorageTypeRecords()
    spoolNewProductRecords();
    setLoading(false)
  }, []);



  const onUpdateStatus =  async () => {


    const http = new HttpService();
    setLoading(true);
    setShowError(true);
  const dataupdate: IModel_NewProducts.updateNewProductStatus ={
    itemId: parseInt(params.id),
    userId: "Services",
    itemStatus:statusselected
  }
  
    const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.updateNewProductStatus>(`/items/v2/items/AppLimena/Status`,"", dataupdate);
  
  
    setTimeout(() => {
      setLoading(false);
  
  if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));
  
      toast.success(<Text as="b">Product successfully updated</Text> );
      push(routes.newproducts.home);
      }else{
      const final : any=response;
      const errorResp=final as IModel_Errorgateway.IError_gateway;
      setErrorMessage(errorResp.response)
      console.log("Complete error log",errorResp)
      toast.error(
        <Text as="b">Error when update product, please check log at bottom page or contact IT Support</Text>
      );
      setShowError(false);
      }
  
  
  
        }, 600);
  
  } 


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
      <Link  href={routes.newproducts.home} >
          Back to list
      </Link>
      </div>
      </PageHeader>

      <div className="mt-2 flex flex-col gap-y-6 @container sm:gap-y-10 mb-4">
      {(!loading) ?
    newproduct ? (
<>
<NewProductsDetails id={params.id} record={newproduct} internalcategories={internalcategories}
subcategories={subcategories} brands={brands} uoms={uoms} uomsGroup={uomsGroup} vendors={vendors}
storagetype={storagetype} propertiesvalues={propertiesvalues}  

/>

<div className="mt-4 flex items-center gap-3 @lg:mt-0">
  {(newproduct.status!=6 && newproduct.status!=7 && newproduct.status!=5) ? (
<>
<label>Select Status</label>

          <Select
              label=""
              labelClassName="text-gray-900"
              dropdownClassName=""
              inPortal={false}
              defaultValue={0}
              value={statusselected}
              onChange={setStatusSelected}
              options={newproduct.status==1 ? statusProductPurchasing : newproduct.status==2 ? statusProductMarketing : newproduct.status==3 ? statusProductFinances :  statusProductPurchasing}
              getOptionValue={(option) => option.value}
              displayValue={(selected: number) =>
                statusProduct?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />   
        

          <Button  onClick={onUpdateStatus} className="w-full @lg:w-auto">
           
            Change product status
          </Button>
</>
  ):null}

        </div>
</>

      
    ) : null
 :<>Loading...</> 
    }

      </div>
      {!showerror ? (
      <GeneralErrorCard key={Math.random()} data={errormessage}/>
) : null}
    </>
  );
}
