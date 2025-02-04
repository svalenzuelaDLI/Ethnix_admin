"use client";

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button, Text } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import NewCustomersTable from '@/app/shared/newcustomers/newcustomers-list/table';
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
import { IError_gateway } from '@/types/models/normalizeError';
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';
//SESSION
import { useSession } from "next-auth/react"


//export const metadata = {
 // ...metaObject('Invoices'),
//};

const pageHeader = {
  title: 'New Customers List - Completed - In SAP',
  breadcrumb: [
    {
      href: routes.customers.dashboard,
      name: 'Home',
    },
    {
      href: routes.newcustomers.completed,
      name: 'New Customers Completed',
    },
    {
      name: 'List',
    },
  ],
};

export default function InvoiceListPage() {

  const http = new HttpService();
  const { data:session } = useSession()

  const [newcustomers, setNewCustomers] = useState<IModel_NewCustomers.INewCustomer[]>([]);
  const [errorLoadCustomers, setErrorLoadCustomers] = useState<IModel_Errorgateway.IError_gateway>();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);



  const spoolNewCustomersRecords = async () => {    
    setLoading(true);
    console.log("TOKEN SESSION", session.user.access_token.user.token)
    const response = await http.service().get<IModel_NewCustomers.getNewCustomers>(`/Customers/Customers/AppLimena`,
    session?.user.access_token.user.token, { Filter: "x.Status in (7)"});

console.log("REEESPUSTA",response)

    if (response?.data) {
      if (response?.data.data.length>0) {
        console.log("Listado->", response.data.data)
        setNewCustomers([...response.data.data]);
      

        //verificamos si hay mas datos
        if(response?.data.totalRecords>250){
          //pasamos a siguientes paginas
          const totalrecord=response?.data.totalRecords;
          const totalpages= Math.ceil(totalrecord/250);
          const maxPages = totalpages;

          for(let i = 2; i <= maxPages; i++){
            //Obtenemos siguiente pagina
            const responseloop = await http.service().get<IModel_NewCustomers.getNewCustomers>(`/Customers/Customers/AppLimena`,
              session?.user.access_token.user.token, { Filter: "x.Status in (7)", PageNumber: i});
          
          console.log("REEESPUSTA loop",responseloop)
          
              if (responseloop?.data) {
                if (responseloop?.data.data.length>0) {
                  setNewCustomers(prevState => ([...prevState, ...responseloop.data.data]))

                }
                }
              }
          
              setLoading(false)
        }else{
          setLoading(false)
        }
      }
      else {      
        const final : any=response;
        setErrorLoadCustomers(final as IModel_Errorgateway.IError_gateway)
        console.log("No data.data",final)
      }
    }
    else {
      //const final : any=response;
      //setErrorLoadCustomers(final as IModel_Errorgateway.IError_gateway)

     

      const final : any=response;
      console.log("No data",final)
      const errorResp=final as IModel_Errorgateway.IError_gateway;
      setErrorMessage(errorResp.response)
      console.log("Complete error log",errorResp)
      toast.error(
        <Text as="b">Error when loading customers, please check log at bottom page or contact IT Support</Text>
      );
      setShowError(false);

    }
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

{(!loading) ?
 (
  newcustomers?.length>0 ? (
    <NewCustomersTable data={newcustomers} />

) : "No data to show"
)
: "No data to show"
}
      

      {!showerror ? (
            <GeneralErrorCard key={Math.random()} data={errormessage}/>
      ) : null}
        </>

  );
      }

