"use client";

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import NewCustomersTable from '@/app/shared/newcustomers_notifications/newcustomers-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
//SESSION
import { useSession } from "next-auth/react"
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';



//export const metadata = {
 // ...metaObject('Invoices'),
//};

const pageHeader = {
  title: 'New Customers Notifications',
  breadcrumb: [
    {
      href: routes.customers.dashboard,
      name: 'Home',
    },
    {
      href: routes.newcustomers_notifications.home,
      name: 'New Customers Notifications',
    },
    {
      name: 'List',
    },
  ],
};

export default function InvoiceListPage() {

  const http = new HttpService();
  const [notifications, setNotifications] = useState<IModel_NewCustomers.INotifications[]>([]);
  const [errorLoadCustomers, setErrorLoadCustomers] = useState<IModel_Errorgateway.IError_gateway>();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);

  //session
  const { data:session } = useSession()


console.log("Session data --->",session)


  const spoolNotificationsRecords = async () => {    
    setLoading(true);
    const response = await http.service().get<IModel_NewCustomers.getNotifications>(`/Customers/Notifications`,session?.user.access_token.user.token);
    console.log(response)
    if (response?.data) {
      if (response?.data.length) {
        console.log("Listado->", response.data)
        setNotifications([...response.data]);}
      else {      
        const final : any=response;
        setErrorLoadCustomers(final as IModel_Errorgateway.IError_gateway)
        console.log("No data.data",final)
      }
    }
    else {

      const final : any=response;
      console.log("No data",final)
      const errorResp=final as IModel_Errorgateway.IError_gateway;
      setErrorMessage(errorResp.response)
      console.log("Complete error log",errorResp)
      toast.error(
        <Text as="b">Error when update customer, please check log at bottom page or contact IT Support</Text>
      );
      setShowError(false);

    }
  };


  useEffect( () => {
    spoolNotificationsRecords();
    
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <Link
          href={routes.newcustomers_notifications.create}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="solid">
            Add new
          </Button>
        </Link>
      </PageHeader>

      {notifications?.length>0 ? (
          <NewCustomersTable data={notifications} />

      ) 
      : null
      }

      {!showerror ? (
            <GeneralErrorCard key={Math.random()} data={errormessage}/>
      ) : null}
        </>

  );
      }

