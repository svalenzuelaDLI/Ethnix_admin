"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewProductsMarketing from '@/app/shared/newproducts/edit-newproducts-marketing';
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
  title: 'Edit Product in Marketing',
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


export default function ProductEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [loading, setLoading] = useState(false);
  const [internalcategories, setInternalCategories] = useState<{value: string, label:string}[]>([]);
  const [newproduct, setNewProduct] = useState<IModel_NewProducts.IProduct>();

  const spoolNewProductRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/items/AppLimena`,"",{ Filter: "x.id=" + params.id, IncludeEthnicies:true });
    console.log(response)
    if (response?.data) {
      setNewProduct(response.data.data[0]);    
    } 
  };

    const spoolInternalCategories = async () => {   
      console.log("entrando al fetch categories") 
        const response = await http.service().get<IModel_NewProducts.getInternalCategories>(`/items/InternalCategories`);
        
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
  

  useEffect( () => {
    spoolNewProductRecords();
    spoolInternalCategories();

    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : (
            <EditNewProductsMarketing id={params.id} record={newproduct} internalcategories={internalcategories} years={yearslst} />
      )
      }
    </>
  );
}
