'use client';

import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import {
  PiBank,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCube,
  PiCurrencyCircleDollar,
  PiFolder,
  PiFolderUser
} from 'react-icons/pi';
import TransactionCard, {
  TransactionType,
} from '@/components/cards/transaction-card';
import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
import { IError_gateway } from '@/types/models/normalizeError';
//SESSION
import { useSession } from "next-auth/react"
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';


type FileStatsType = {
  className?: string;
};

// const statData: TransactionType[] = [
//   {
//     title: 'Total Customers',
//     amount: '16,085k',
//     increased: true,
//     percentage: '32.45',
//     icon: PiBank,
//     iconWrapperFill: '#8A63D2',
//   },
//   {
//     title: 'Business Partners',
//     amount: '25,786k',
//     increased: false,
//     percentage: '32.45',
//     icon: PiCube,
//     iconWrapperFill: '#00CEC9',
//   },
//   {
//     title: 'New Customers',
//     amount: '38,503k',
//     increased: true,
//     percentage: '32.45',
//     icon: PiCurrencyCircleDollar,
//     iconWrapperFill: '#0070F3',
//   },
//   {
//     title: 'Inactive Customers',
//     amount: '27,432k',
//     increased: false,
//     percentage: '32.45',
//     icon: PiFolder,
//     iconWrapperFill: '#F5A623',
//   },
// ];

export function StatGrid() {
  return (
    <>
      {statData.map((stat: any, index: number) => {
        return (
          <TransactionCard
            key={'transaction-card-' + index}
            transaction={stat}
            className="min-w-[300px]"
          />
        );
      })}
    </>
  );
}

export default function FileStats({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  const http = new HttpService();
  const [newcustomer, setNewCustomer] = useState<IModel_NewCustomers.INewCustomer>();
  const [loading, setLoading] = useState(true);
  const [propertiesvalues, setPropertiesValues] = useState<string[]>([]);
  const [receivingDaysvalues, setReceivingDaysValues] = useState<string[]>([]);
  const [operationtimevalue, setOperationTimeValues] = useState<string[]>([]);
  const [pricelistvalues, setPriceListValues] = useState<{value: string, label:string}[]>([]);
  const [sapcustomers, setSAPCustomers] = useState<{value: string, label:string}[]>([]);
//Datos
const [countNewCustomers, setCountNewCustomers] = useState(0);
const [countSAPCustomers, setCountSAPCustomers] = useState(0);
const [countBPCustomers, setCountBPCustomers] = useState(0);
const [countInactiveCustomers, setCountInactiveCustomers] = useState(0);
//Arrays
  const spoolNewCustomersRecords = async () => {    
    setLoading(true);
    const response = await http.service().get<IModel_NewCustomers.getNewCustomers>(`/Customers/Customers/AppLimena`,
    { Filter: "x.Status in (1,2,3,4,5,6)"});

    if (response?.data) {
      if (response?.data.data.length) {
        console.log("Listado->", response.data.data)
        setCountNewCustomers(response.data.data.length)
        //count
        //data
      }
    }
    else {
      console.log("Complete error log",response)
    }
  };
  
  const spoolCustomersFatherRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSAPCustomers>(`/Customers/Customers/Sap`, {"filter":"x.isfather==true"});
    console.log("BP Customers father", response) 
    if (response?.data) {
      if(response?.data.data.length>0){
        setCountBPCustomers(response.data.data.length)
      }
    }
  };

  const spoolSAPCustomersRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSAPCustomers>(`/Customers/Customers/Sap`, {"filter":"x.active=='Y'"});
    console.log("SAP active Customers", response) 
    if (response?.data) {
      if(response?.data.data.length>0){
        setCountSAPCustomers(response.data.totalRecords)
      }
    }
  };

  const spoolInactiveCustomersRecords = async () => {    
    const response = await http.service().get<IModel_NewCustomers.getSAPCustomers>(`/Customers/Customers/Sap`, {"filter":"x.active=='N'"});
    console.log("SAP inactive Customers", response) 
    if (response?.data) {
      if(response?.data.data.length>0){
        setCountInactiveCustomers(response.data.totalRecords)
      }
    }
  };

  useEffect( () => {
    spoolNewCustomersRecords();
    spoolCustomersFatherRecords();
    spoolInactiveCustomersRecords();
    spoolSAPCustomersRecords();
    setLoading(false)
  }, []);



  return (
<>
  
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 3xl:hidden dark:from-gray-50 dark:via-gray-50/70"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
        >
    <div
      className={cn(
        'w-full rounded-[10px] border border-gray-300 px-6 py-7 @container',
        'min-w-[300px]'
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: "#000000" }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <PiFolder className="h-auto w-[30px]" />
        </span>
        <div className="space-y-2">
          <p className="text-gray-500 ">Active Customers</p>
          {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
          <p className="font-lexend text-lg font-semibold text-gray-900 2xl:text-[20px] 3xl:text-[22px] dark:text-gray-700">
            {countSAPCustomers}
          </p>
        </div>
      </div>
      </div> 

      <div
      className={cn(
        'w-full rounded-[10px] border border-gray-300 px-6 py-7 @container',
        'min-w-[300px]'
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: "#000000" }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <PiFolder className="h-auto w-[30px]" />
        </span>
        <div className="space-y-2">
          <p className="text-gray-500 ">BP Customers</p>
          {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
          <p className="font-lexend text-lg font-semibold text-gray-900 2xl:text-[20px] 3xl:text-[22px] dark:text-gray-700">
            {countBPCustomers}
          </p>
        </div>
      </div>
      </div> 

      <div
      className={cn(
        'w-full rounded-[10px] border border-gray-300 px-6 py-7 @container',
        'min-w-[300px]'
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: "#000000" }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <PiFolderUser className="h-auto w-[30px]" />
        </span>
        <div className="space-y-2">
          <p className="text-gray-500 ">New Customers</p>
          {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
          <p className="font-lexend text-lg font-semibold text-gray-900 2xl:text-[20px] 3xl:text-[22px] dark:text-gray-700">
            {countNewCustomers}
          </p>
        </div>
      </div>
      </div> 

      <div
      className={cn(
        'w-full rounded-[10px] border border-gray-300 px-6 py-7 @container',
        'min-w-[300px]'
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: "#000000" }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <PiFolder className="h-auto w-[30px]" />
        </span>
        <div className="space-y-2">
          <p className="text-gray-500 ">Inactive Customers</p>
          {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
          <p className="font-lexend text-lg font-semibold text-gray-900 2xl:text-[20px] 3xl:text-[22px] dark:text-gray-700">
            {countInactiveCustomers}
          </p>
        </div>
      </div>
      </div> 


             </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 3xl:hidden dark:from-gray-50 dark:via-gray-50/70 "
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
    
  
    </>
  );
}
