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
    label:"2018",
    value:"2018",
},
{
  label:"2019",
  value:"2019",
},
{
  label:"2020",
  value:"2020",
},
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



  const spoolSubcategories = async () => {   
    console.log("entrando al fetch categories") 
      const response = await http.service().get<IModel_NewProducts.getSubcategories>(`/items/subcategories`);
      
      console.log(response)
      if (response?.data) {
        if(response?.data.data.length>0){
  
        const pricel = response?.data.data
          ? response.data.data.map((item) => ({
              ...{value: item.id.toString(), label:item.subcategoryName, categoryId:item.categoryId},
            }))
          : [];
  
          console.log(pricel)
          setSubcategories(pricel)
      }
      }
    };

        
  const spoolUOMRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getUOMs>(`/items/items/uoms`);
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

      
  const spoolBrandsRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.getBrands>(`/items/brands`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id.toString(), label:item.brandName},
          }))
        : [];

        console.log("BRANDS",pricel)
        setBrands(pricel)
    }
    }
  };

  useEffect( () => {
    setLoading(false)
    spoolSubcategories()
    spoolUOMRecords()
    spoolBrandsRecords()
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
            <CreateNewProducts  id={params.id} record={newproduct}
             years={yearslst} subcategories={subcategories} brands={brands} uoms={uoms}
             />

             


    </>
  );
}

