"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateNewProducts from '@/app/shared/newproducts/create-newproducts';
//import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import React, { useState, useEffect } from "react";

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewProducts } from "@/types";
import { quotelessJson } from 'zod';
import { customer } from '@/app/shared/logistics/customer-profile/data';


type Props = {
  params: { id: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const id = params.id;

//   return metaObject(`Edit ${id}`);
// }




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

const pageHeader = {
  title: 'Create Product (Purchasing)',
  breadcrumb: [
    {
      href: routes.customers.dashboard,
      name: 'Home',
    },
    {
      href: routes.newproducts.home,
      name: 'New Products',
    },
    {
      name: 'Create',
    },
  ],
};



export default function ProductCreatePage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [newproduct, setNewProduct] = useState<IModel_NewProducts.INewProduct>();
  const [loading, setLoading] = useState(true);
  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);

  const [subcategories, setSubcategories] = useState<{value: string, label:string, categoryId:string}[]>([]);
  const [brands, setBrands] = useState<{value: string, label:string}[]>([]);
  const [uoms, setUoms] = useState<{value: string, label:string}[]>([]);
  const [uomsGroup, setUomsGroup] = useState<{value: string, label:string, uoms:[]}[]>([]);

  const [vendors, setVendors] = useState<{value: string, label:string}[]>([]);
  const [storagetype, setStorageType] = useState<{value: string, label:string}[]>([]);

    const [ethnicities, setEthnicities] = useState<{value: string, label:string}[]>([]);



  const spoolSubcategories = async () => {   
      const response = await http.service().get<IModel_NewProducts.getSubcategories>(`/items/v2/subcategories`,"",{PageSize:250,PageNumber:1});
      
      console.log(response)
      if (response?.data) {
        if(response?.data.data.length>0){
  
        const pricel = response?.data.data
          ? response.data.data.map((item) => ({
              ...{value: item.id.toString(), label:item.categoryId + " - " + item.subcategoryName, categoryId:item.categoryId},
            }))
          : [];
          setSubcategories(pricel.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
      }
      }
    };

        
  const spoolUOMRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getUOMs>(`/items/v2/items/uoms`,"",{PageSize:250,PageNumber:1});
      if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.uomEntry.toString(), label:item.uomName},
          }))
        : [];

        setUoms(pricel.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
    }
    }
  };


          
  const spoolEthnicities = async () => {    
        console.log("entrando al fetch ethnix") 

    const response = await http.service().get<IModel_NewProducts.getEthnicities>(`/items/v2/Properties/GetEthnicities`,"",{PageSize:250,PageNumber:1});
    
        console.log("ETHNIX", response)  
    if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.code, label:item.name},
          }))
        : [];


        setEthnicities(pricel.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
    }
    }
  };


  const spoolUOMGroupRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getUOMsGroup>(`/items/v2/items/UomGroups`,"",{IncludeUoms:true,PageSize:250});
      if (response?.data) {
      if(response?.data.data.length>0){

      const uomgroups = response?.data.data
        ? response.data.data.filter(item => !item.ugpName.includes("Block")).map((item) => ({
            ...{value: item.ugpEntry.toString(), label:item.ugpName, uoms: item.uoms},
          }))
        : [];

        setUomsGroup(uomgroups.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
    }
    }
  };  

  const spoolVendorsRecords = async () => {   
      let allData = [];
      let page = 1;
      let hasNextPage = true;
    
      while (hasNextPage) {
        //const url = `${baseUrl}?page=${page}&limit=${pageSize}`; // Adjust as needed


        try {
            const response = await http.service().get<IModel_NewProducts.getVendors>(`/items/v2/items/AppLimena/Vendors`,"",{PageSize:250,PageNumber:page});

          if (!response?.data) {
            throw new Error(`HTTP error! status: ${response}`);
          }

    if(response?.data.data.length>0){
                    response.data.data.map((item) => (
                        allData.push(item)
                      ))
                  }


          if (response?.data && response?.data.data.length > 0) {
            //allData = allData.concat(data);
            page++;
          } else {
            hasNextPage = false;
          }
        } catch (error) {
          console.error("Error fetching page:", error);
          hasNextPage = false; // Stop on error
        }
     } 
          const vendors = allData
        ? allData.map((item) => ({
            ...{value: item.vendorId, label: item.vendorId + " " + item.vendorName},
          }))
        : [];

        setVendors(vendors)
         

  };  

  const spoolStorageTypeRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getStorageType>(`/items/v2/StorageType`,"",{PageSize:250,PageNumber:1});
      if (response?.data) {
      if(response?.data.data.length>0){

      const storages = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id, label: item.storageName},
          }))
        : [];

        setStorageType(storages.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
    }
    }
  };  

  const spoolBrandsRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getStorageType>(`/items/v2/brands`,"",{PageSize:250,PageNumber:1});
    let pricel=[];
      if (response?.data) {
      if(response?.data.data.length>0){
    

          response.data.data.map((item) => (
            pricel.push({value: item.id.toString(), label:item.brandName})
          ))
       }
      }

        //Volvemos a consultar ya que tiene mas de 250
        const response2 = await http.service().get<IModel_NewProducts.getStorageType>(`/items/v2/brands`,"",{PageSize:250,PageNumber:2});
          if (response2?.data) {
          if(response2?.data.data.length>0){
    
          response2.data.data.map((item) => (
                pricel.push({value: item.id.toString(), label:item.brandName})
              ))
        


        setBrands(pricel.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)))
            }
          }
  };

  useEffect( () => {
    setLoading(false)
    spoolSubcategories()
    spoolUOMRecords()
    spoolUOMGroupRecords()
    spoolBrandsRecords()
    spoolVendorsRecords()
    spoolStorageTypeRecords()
    spoolEthnicities()
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
            <CreateNewProducts  id={params.id} record={newproduct}
             years={yearslst} subcategories={subcategories} brands={brands} uoms={uoms} uomsGroup={uomsGroup} vendors={vendors}
             storagetype={storagetype}
             />

             


    </>
  );
}

