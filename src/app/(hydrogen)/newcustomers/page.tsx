"use client";

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import NewCustomersTable from '@/app/shared/newcustomers/newcustomers-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import React, { useState, useEffect } from "react";
// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers } from "@/types";




//export const metadata = {
 // ...metaObject('Invoices'),
//};

const pageHeader = {
  title: 'New Customers List',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'New Customers',
    },
    {
      name: 'List',
    },
  ],
};

export default function InvoiceListPage() {

  const http = new HttpService();
  const [newcustomers, setNewCustomers] = useState<IModel_NewCustomers.INewCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const spoolNewCustomersRecords = async () => {    
    setLoading(true);
    const response = await http.service().get<IModel_NewCustomers.getNewCustomers>(`/Customers/Customers/AppLimena`,
    { Filter: "x.Status in (7)"});

    console.log(response.data.data)
    if (response?.data.data.length) setNewCustomers([...response.data.data]);
    
  };


  useEffect( () => {
    spoolNewCustomersRecords();
    
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={invoiceData}
            fileName="invoice_data"
            header="ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At"
          />
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Invoice
            </Button>
          </Link>
        </div> */}
      </PageHeader>

{newcustomers?.length>0 ? (
     <NewCustomersTable data={newcustomers} />

) : null}

     
    </>
  );
}
