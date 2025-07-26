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




const pageHeader = {
  title: 'Edit Customer',
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
  ],
};



export default function CustomerEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(true);
  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);
  const [receivingDaysvalues, setReceivingDaysValues] = useState<string[]>([]);
  const [operationtimevalue, setOperationTimeValues] = useState<string[]>([]);
  const [pricelistvalues, setPriceListValues] = useState<{value: string, label:string}[]>([]);
  const [sapcustomers, setSAPCustomers] = useState<{value: string, label:string}[]>([]);


  const spoolNewCustomerRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
  
    console.log(response)
    if (response?.data) {
      setPropertiesValues(response.data.properties.map((item) => item.propertyNum.toString()))  
      setReceivingDaysValues(response.data.receivingDays.split(','))
      setOperationTimeValues(response.data.operationTime.split(' - '))
      setNewCustomer(response.data);
      
    }
  };
  
    
  const spoolPriceListRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getPriceList>(`/PriceList/pricelist/names`);
      if (response?.data) {
      if(response?.data.data.length>0){

      const pricel = response?.data.data
              ? response.data.data.filter((items=>items.active=="Y")).map((item) => ({
            ...{value: item.listNum.toString(), label:item.listName},
          }))
        : [];

        setPriceListValues(pricel)
    }
    }
  };

  const spoolCustomersFatherRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSAPCustomers>(`/Customers/Customers/Sap`,"", {"filter":"x.isfather==true"});
    console.log("SAP Customers father", response) 
    if (response?.data) {
      if(response?.data.data.length>0){

      const customerdasap = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.cardCode.toString(), label:item.cardName},
          }))
        : [];


          const blankcustomer={
            value: "-",
            label: "N/A"
          }
          customerdasap.push(blankcustomer)

        setSAPCustomers(customerdasap)
    }
    }
  };

  useEffect( () => {
    spoolPriceListRecords();
    spoolCustomersFatherRecords();
    spoolNewCustomerRecords();
    setLoading(false)
  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ?
    newcustomer ? (

            <CreateNewCustomers pricelistvalues={pricelistvalues} id={params.id} operationtimevalue={operationtimevalue} record={newcustomer} propertiesvalues={propertiesvalues} receivingDaysvalues={receivingDaysvalues}
            sapcustomers={sapcustomers} />

    ) : null
 :<>Loading...</> 
    }
    </>
  );
}

