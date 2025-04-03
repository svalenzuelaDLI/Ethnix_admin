"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewProductsFinantials from '@/app/shared/newproducts/edit-newproducts-finantials';
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
  title: 'Edit Product in Finance',
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
      name: 'Finance',
    },
  ],
};



export default function ProductEditPage({ params }: any) {
  console.log('Customer Edit Page ID', params.id);
  const http = new HttpService();
  const [newproduct, setNewProduct] = useState<IModel_NewProducts.IProduct>();
  const [loading, setLoading] = useState(false);
  const [paymentterms, setPaymentTerms] = useState<{value: string, label:string}[]>([]);
  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);

  const spoolNewProductRecords = async () => {    
    const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/v2/items/AppLimena`,"",{ Filter: "x.id=" + params.id, IncludeEthnicies:true });
    console.log(response)
    if (response?.data) {
      setNewProduct(response.data.data[0]);    
    } 
  };
  
  const spoolPaymentTermsRecords = async () => {    

  };

  useEffect( () => {
    spoolNewProductRecords();
 
    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : newproduct  ? (
            <EditNewProductsFinantials id={params.id} record={newproduct}   />
      ) : null 
      }
    </>
  );
}
