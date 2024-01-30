"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateNewCustomers from '@/app/shared/newcustomers/create-newcustomers';
//import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import React, { useState, useEffect } from "react";

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers } from "@/types";


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




const pageHeader = {
  title: 'Edit Customer',
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
  ],
};

const invoiceData = {
  fromName: 'Ashley Kling-Breitenberg Jr.',
  fromAddress: '8179 Armstrong Tunnel Apt. 182 Maribelview, WI 05172',
  toName: 'Cameron Hudson V',
  toAddress: '081 Fadel Extensions Suite 252 West Duncanborough, OK 92119',
  fromPhone: '12083972822',
  toPhone: '12073252812',
  shipping: 10,
  discount: 50,
  taxes: 15,
  createDate: new Date(),
  status: 'draft',
  dueDate: new Date(),
  invoiceNumber: 'INV-0071',
  items: [
    {
      item: 'Logo Design',
      description: 'Custom logo design for website',
      quantity: 3,
      price: 200,
    },
    {
      item: 'Web Development',
      description: 'Front-end and back-end development',
      quantity: 1,
      price: 1200,
    },
  ],
};

export default function CustomerEditPage({ params }: any) {
  console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [newcustomer, setNewCustomers] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(false);
  const spoolNewCustomersRecords = async () => {    
    setLoading(true);
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
  
    console.log(response)
    if (response?.data) setNewCustomers(response.data);
    
  };
  
  
  useEffect( () => {
    spoolNewCustomersRecords();
    
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>

      <CreateNewCustomers id={params.id} record={newcustomer} />
    </>
  );
}
