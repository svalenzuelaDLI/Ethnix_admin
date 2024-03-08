"use client";
import { PiDownloadSimpleBold } from 'react-icons/pi';
import NewCustomersDetails from '@/app/shared/newcustomers/newcustomers-details';
import PrintButton from '@/app/shared/print-button';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import { Button, Select , Text} from 'rizzui';
import { routes } from '@/config/routes';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import GeneralErrorCard from '@/components/cards/general-error-card';

// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
import { statusCustomer } from '@/app/shared/newcustomers/select-options';
import { customerStatus } from '@/app/shared/logistics/customer-profile/edit-profile/data';


const pageHeader = {
  title: 'Customer Details',
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
      name: 'Details',
    },
  ],
};

export default function NewCustomerDetailsPage({ params }: any) {


  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(true);
  const [statusselected, setStatusSelected] = useState(0);
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);

  const { push } = useRouter();

  const spoolNewCustomerRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getNewCustomer>(`/Customers/Customers/AppLimena/` + params.id);
  
    console.log(response)
    if (response?.data) {
      setNewCustomer(response.data);
      
    }
  };
  

  useEffect( () => {
    spoolNewCustomerRecords();
    setLoading(false)
  }, []);



  const onUpdateStatus =  async () => {


    const http = new HttpService();
    setLoading(true);
    setShowError(true);
  const dataupdate: IModel_NewCustomers.updateNewCustomerStatus ={
    customerId: parseInt(params.id),
    userId: "Services",
    customerStatus:statusselected
  }
  
    const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomerStatus>(`/Customers/Customers/AppLimena/Status`,"", dataupdate);
  
  
    setTimeout(() => {
      setLoading(false);
  
  if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));
  
      toast.success(<Text as="b">Customer successfully {params.id ? 'updated' : 'created'}</Text> );
      push(routes.newcustomers.home);
      }else{
      const final : any=response;
      const errorResp=final as IModel_Errorgateway.IError_gateway;
      setErrorMessage(errorResp.response)
      console.log("Complete error log",errorResp)
      toast.error(
        <Text as="b">Error when update customer, please check log at bottom page or contact IT Support</Text>
      );
      setShowError(false);
      }
  
  
  
        }, 600);
  
  } 


  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
      <Link  href={routes.newcustomers.home} >
          Back to list
      </Link>
      </div>
      </PageHeader>

      <div className="mt-2 flex flex-col gap-y-6 @container sm:gap-y-10 mb-4">
      {(!loading) ?
    newcustomer ? (
<>
<NewCustomersDetails id={params.id} record={newcustomer}/>

<div className="mt-4 flex items-center gap-3 @lg:mt-0">
  <label>Select Status</label>
          <Select
              label=""
              
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={statusselected}
              onChange={setStatusSelected}
              options={statusCustomer}
              getOptionValue={(option) => option.value}
              displayValue={(selected: number) =>
                statusCustomer?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />   
        

          <Button  onClick={onUpdateStatus} className="w-full @lg:w-auto">
           
            Change Status
          </Button>
        </div>
</>

      
    ) : null
 :<>Loading...</> 
    }

      </div>
      {!showerror ? (
      <GeneralErrorCard key={Math.random()} data={errormessage}/>
) : null}
    </>
  );
}
