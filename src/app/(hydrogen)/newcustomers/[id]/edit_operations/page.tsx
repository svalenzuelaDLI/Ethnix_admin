"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewCustomersOperations from '@/app/shared/newcustomers/edit-newcustomers-operations';
//import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import React, { useState, useEffect } from "react";

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers } from "@/types";
import { quotelessJson } from 'zod';


type Props = {
  params: { id: string };
};


const pageHeader = {
  title: 'Edit Customer in Operations',
  breadcrumb: [
    {
      href: routes.customers.dashboard,
      name: 'Home',
    },
    {
      href: routes.newcustomers.home,
      name: 'New Customers',
    },
    {
      name: 'Edit',
    },
    {
      name: 'Operations',
    },
  ],
};



export default function CustomerEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(false);
  const [deliveryroutes, setDeliveryRoutes] = useState<{value: string, label:string}[]>([]);
  const [trucks, setTrucks] = useState<{value: string, label:string}[]>([]);


  const spoolNewCustomerRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
    console.log(response)
    if (response?.data) {
      setNewCustomer(response.data);    
    } 
  };
  
  const spoolDeliveryRoutesRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getDeliveryRoutes>(`/Customers/Routes/DeliveryRoutes`,"",{ PageSize: 250});
      if (response?.data) {
        console.log("Routes",response?.data)
      if(response?.data.data.length>0){

      const deliveryrout = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.code, label:item.name},
          }))
        : [];

        setDeliveryRoutes(deliveryrout)
    }
    }
  };


  const spoolTrucksRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getTrucks>(`/Customers/Properties/TypesTruck`);
      if (response?.data) {
      if(response?.data.length>0){

      const truc = response?.data
        ? response.data.map((item) => ({
            ...{value: item.fldValue, label:item.descr},
          }))
        : [];

        setTrucks(truc)
    }   
    }
  };


  
  useEffect( () => {
    spoolNewCustomerRecords();
    spoolDeliveryRoutesRecords();
    spoolTrucksRecords();   
    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : (
            <EditNewCustomersOperations id={params.id} record={newcustomer} deliveryroutes={deliveryroutes} trucks={trucks}  />
      )
      }
    </>
  );
}
