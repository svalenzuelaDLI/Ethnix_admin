'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button, Text,Badge } from 'rizzui';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/newcustomers/newcustomers-list/columns';
import { toast } from 'react-hot-toast';
//SESSION
import { useSession } from "next-auth/react"
// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
const FilterElement = dynamic(
  () => import('@/app/shared/newcustomers/newcustomers-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};

export default function NewCustomersTable({ data = [] }: { data: any[] }) {
  const [pageSize, setPageSize] = useState(10);

    //session
    const { data:session } = useSession()


    console.log("Session data --->",session?.user.access_token.user)
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback( async (id: string) => {
    const http = new HttpService();

  const dataupdate: IModel_NewCustomers.updateNewCustomerStatus ={
    customerId: parseInt(id),
    userId: "Services",
    customerStatus:2
  }
  
    const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomerStatus>(`/Customers/Customers/AppLimena/Status`,session?.user.access_token.user, dataupdate);
  
  
    setTimeout(() => {
  
  if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));
  
      toast.success(<Text as="b">Customer successfully deleted</Text> );
      handleDelete(id);
      }else{
      const final : any=response;
      const errorResp=final as IModel_Errorgateway.IError_gateway;
   
      console.log("Complete error log",errorResp)
      toast.error(
        <Text as="b">Error when delete customer</Text>
      );
  
      }
  
        }, 600);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        user: session?.user.access_token.user
       
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
  <div>
      <div className="flex items-center mb-5">
              {/* <Badge color="warning" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">In revision (finance)</Text>
              <span style={{marginRight:3}}>{" ---> "}</span> */}
              <Badge color="warning" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">In revision (customer service)</Text>
              <span style={{marginRight:3}}>{" ---> "}</span>
              <Badge color="primary" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">Commercial</Text>
              <span style={{marginRight:3}}>{" ---> "}</span>
              <Badge color="primary" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">Operations</Text>
              <span style={{marginRight:3}}>{" ---> "}</span>
              <Badge color="primary" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">Finance</Text>
              <span style={{marginRight:3}}>{" ---> "}</span>
              <Badge color="success" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">SAP</Text>
            </div>
  </div>

      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Re-send {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
