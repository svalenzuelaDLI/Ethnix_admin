"use client";

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import EditNewCustomersCommercial from '@/app/shared/newcustomers/edit-newcustomers-commercial';
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
  title: 'Edit Customer in Commercial',
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
      name: 'Commercial',
    },
  ],
};



export default function CustomerEditPage({ params }: any) {
  //console.log('Customer Edit Page ID', params.id);

  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(false);
  const [salesreps, setSalesReps] = useState<{value: string, label:string}[]>([]);
  const [salessupervisors, setSalesSupervisors] = useState<{value: string, label:string}[]>([]);
  const [salesroutes, setSalesRoutes] = useState<{value: string, label:string}[]>([]);
  const [pricelistvalues, setPriceListValues] = useState<{value: string, label:string}[]>([]);
  const [sapcustomers, setSAPCustomers] = useState<{value: string, label:string}[]>([]);


  const spoolNewCustomerRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
    console.log(response)
    if (response?.data) {
      setNewCustomer(response.data);    
    } 
  };
  
  const spoolSalesRepresentativesRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSalesReps>(`/Customers/SalesReps`,"",{ PageSize: 250});
      if (response?.data) {
      if(response?.data.data.length>0){

      const salesrep = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id.toString(), label:item.name},
          }))
        : [];

        setSalesReps(salesrep)
    }
    }
  };


  const spoolSalesSupervisorsRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSalesSupervisors>(`/Customers/SalesReps/Supervisors`,"",{ PageSize: 250});
      if (response?.data) {
      if(response?.data.data.length>0){

      const salessuperv = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.id.toString(), label:item.name},
          }))
        : [];

        setSalesSupervisors(salessuperv)
    }   
    }
  };


  const spoolSalesRoutesRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSalesRoutes>(`/Customers/Routes/SalesRoutes`,"",{ PageSize: 250});
      if (response?.data) {
      if(response?.data.data.length>0){
        console.log("TOTAL RUTAS",response.data.data.length)
      const salesrout = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.code, label:item.name},
          }))
        : [];

        setSalesRoutes(salesrout)
    }   
    }
  };
  
  const spoolPriceListRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getPriceList>(`/PriceLists/Pricelist/Names`);
      if (response?.data) {
      if(response?.data.data.length>0){

        //console.log("PRICELIST", response?.data.data)
      const pricel = response?.data.data
        ? response.data.data.map((item) => ({
            ...{value: item.listNum.toString(), label:item.listName},
          }))
        : [];

        setPriceListValues(pricel)
    }
    }
  };

  const spoolCustomersFatherRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSAPCustomers>(`/Customers/Customers/Sap`,"", {"filter":"x.isfather==true"});
    //console.log("SAP Customers father", response) 
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
    spoolNewCustomerRecords();
    spoolPriceListRecords();
    spoolCustomersFatherRecords();
    spoolSalesRepresentativesRecords();
    spoolSalesSupervisorsRecords();
    spoolSalesRepresentativesRecords();
    spoolSalesRoutesRecords();
    setLoading(true)

  }, []);


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>
      {(!loading) ? null : (
            <EditNewCustomersCommercial id={params.id} record={newcustomer} salesreps={salesreps} salessupervisors={salessupervisors} salesroutes={salesroutes} 
            pricelistvalues={pricelistvalues} sapcustomers={sapcustomers}/>
      )
      }
    </>
  );
}
