"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewProductsPurchasing from '@/app/shared/newproducts/edit-newproducts-purchasing';
//import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import React, { useState, useEffect } from "react";

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewProducts } from "@/types";
import { quotelessJson } from 'zod';


type Props = {
  params: { id: string };
};


const pageHeader = {
  title: 'Edit Product in Purchasing',
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
      name: 'Edit',
    },
    {
      name: 'Marketing',
    },
  ],
};

const yearslst=[

{
  label:"2021",
  value:"2021",
},
{
  label:"2022",
  value:"2022",
},
{
  label:"2023",
  value:"2023",
},
{
  label:"2024",
  value:"2024",
},
{
  label:"2025",
  value:"2025",
},
{
  label:"2026",
  value:"2026",
},
]


export default function ProductEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [loading, setLoading] = useState(false);
  const [internalcategories, setInternalCategories] = useState<{value: string, label:string}[]>([]);
  const [newproduct, setNewProduct] = useState<IModel_NewProducts.IProduct>();
const [subcategories, setSubcategories] = useState<{value: string, label:string, categoryId:string}[]>([]);
  const [brands, setBrands] = useState<{value: string, label:string}[]>([]);
  const [uoms, setUoms] = useState<{value: string, label:string}[]>([]);
  const [uomsGroup, setUomsGroup] = useState<{value: string, label:string}[]>([]);

  const [vendors, setVendors] = useState<{value: string, label:string}[]>([]);
  const [storagetype, setStorageType] = useState<{value: string, label:string}[]>([]);

  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);


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

  const spoolNewProductRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/v2/items/AppLimena`,"",{ Filter: "x.id=" + params.id, IncludeEthnicies:true });
    console.log("PRODUCTO",response)
    if (response?.data) {
      setNewProduct(response.data.data[0]);   
      setPropertiesValues(response.data.data[0].properties.map((item) => item.propertyNum.toString()))  
 
    } 
  };


  

  useEffect( () => {
    spoolSubcategories()
    spoolUOMRecords()
    spoolUOMGroupRecords()
    spoolBrandsRecords()
    spoolVendorsRecords()
    spoolStorageTypeRecords()
    spoolNewProductRecords();

    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : newproduct ? uomsGroup.length>0 ?  (
            <EditNewProductsPurchasing id={params.id} record={newproduct} years={yearslst} 
             subcategories={subcategories} brands={brands} uoms={uoms} uomsGroup={uomsGroup} vendors={vendors}
            storagetype={storagetype} propertiesvalues={propertiesvalues}  /> 
      ) :null : null
      }
    </>
  );
}
