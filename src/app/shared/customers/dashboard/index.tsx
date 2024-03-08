'use client'

import Burn from '@/app/shared/customers/dashboard/burn';
import Spending from '@/app/shared/customers/dashboard/spending';
import Exchange from '@/app/shared/customers/dashboard/exchange';
import CashFlow from '@/app/shared/customers/dashboard/cash-flow';
import Investment from '@/app/shared/customers/dashboard/investment/investment';
import CashInBank from '@/app/shared/customers/dashboard/cash-in-bank';
import BudgetStatus from '@/app/shared/customers/dashboard/budget-status';
import FinancialStats from '@/app/shared/customers/dashboard/transaction-states';
import ExpenseHistory from '@/app/shared/customers/dashboard/expense-history';
import TotalStatistics from '@/app/shared/customers/dashboard/total-statistics';
import TransactionHistoryTable from '@/app/shared/customers/dashboard/transaction-history-table';
import IncomeStatement from '@/app/shared/customers/dashboard/income-statement';

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

export default function FinancialDashboard() {
  const http = new HttpService();
  const [newcustomers, setNewCustomers] = useState<IModel_NewCustomers.INewCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  const { data:session } = useSession()

  const spoolNewCustomersRecords = async () => {    

    const response = await http.service().get<IModel_NewCustomers.getNewCustomers>(`/Customers/Customers/AppLimena`,
    session?.user.access_token.user.token,{ Filter: "x.Status in (1,2,3,4,5,6)"});

    if (response?.data) {
      if (response?.data.data.length) {
        console.log("Listado->", response.data.data)
        setNewCustomers(response.data.data)
        //count
        //data
      }
    }
    else {
      console.log("Complete error log",response)
    }
  };

  useEffect( () => {
    spoolNewCustomersRecords();
    setLoading(false);

  }, []);
  return (
    <div className="grid grid-cols-6 gap-6 @container">
       {(!loading) ?
    newcustomers ? (
      <>
      <FinancialStats className="col-span-full" />
      {/* <TotalStatistics className="col-span-full @[90rem]:col-span-4" /> */}
      <BudgetStatus key={Math.random()} newcustomers={newcustomers} className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      {/* <CashFlow className="col-span-full" />
      <CashInBank className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <Burn className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" /> 
      <ExpenseHistory className="col-span-full @[59rem]:col-span-3 @[59rem]:col-start-4 @[59rem]:row-start-3 @[90rem]:col-span-2 @[90rem]:col-start-auto @[90rem]:row-start-auto" />
      <IncomeStatement className="col-span-full" />
      <TransactionHistoryTable className="col-span-full" />*/}
      <Spending key={Math.random()} newcustomers={newcustomers}  className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      {/* <Exchange className="col-span-full  @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <Investment className="col-span-full  @[59rem]:col-span-3 @[90rem]:col-span-2" /> */}
      </>
    ):null:null
    }
    
      </div>
  );
}
