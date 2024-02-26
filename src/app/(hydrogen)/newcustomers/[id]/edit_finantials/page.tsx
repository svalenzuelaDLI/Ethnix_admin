"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewCustomersFinantials from '@/app/shared/newcustomers/edit-newcustomers-finantials';
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
  title: 'Edit Customer in Finantials',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
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
      name: 'Finantials',
    },
  ],
};



export default function CustomerEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);
  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(false);
  const [paymentterms, setPaymentTerms] = useState<{value: string, label:string}[]>([]);

  const spoolNewCustomerRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
    console.log(response)
    if (response?.data) {
      setNewCustomer(response.data);    
    } 
  };
  
  const spoolPaymentTermsRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getPaymentTerms>(`/Customers/Customers/PaymentTerms`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const paymentterm = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.groupNum.toString(), label:item.pymntGroup},
          }))
        : [];

        setPaymentTerms(paymentterm)
    }
    }
  };



  
  useEffect( () => {
    spoolNewCustomerRecords();
    spoolPaymentTermsRecords();
    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : (
            <EditNewCustomersFinantials id={params.id} record={newcustomer} paymentterms={paymentterms}  />
      )
      }
    </>
  );
}
