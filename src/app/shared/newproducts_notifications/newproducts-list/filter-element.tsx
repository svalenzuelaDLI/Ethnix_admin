'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/components/controlled-table/date-field';
import PriceField from '@/components/controlled-table/price-field';
import StatusField from '@/components/controlled-table/status-field';
import { Button } from 'rizzui';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import { useMedia } from '@/hooks/use-media';
import {
  renderOptionDisplayValueCustomers,
  statusOptions,
} from '@/app/shared/invoice/form-utils';
import {
  statusCustomerString
} from '@/app/shared/newcustomers/select-options';
type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <>
      {/* <PriceField
        value={filters['amount']}
        onChange={(data) => updateFilter('amount', data)}
      /> */}
      {/* <DateFiled
        className="w-full"
        selected={getDateRangeStateValues(filters['createDate'][0])}
        startDate={getDateRangeStateValues(filters['createDate'][0])}
        endDate={getDateRangeStateValues(filters['createDate'][1])}
        onChange={(date: any) => {
          updateFilter('createDate', date);
        }}
        placeholderText="Select created date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Created Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      /> */}
      {/* <DateFiled
        className="w-full"
        selected={getDateRangeStateValues(filters['dueDate'][0])}
        startDate={getDateRangeStateValues(filters['dueDate'][0])}
        endDate={getDateRangeStateValues(filters['dueDate'][1])}
        onChange={(date: any) => {
          updateFilter('dueDate', date);
        }}
        placeholderText="Select due date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Due Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      /> */}
      <StatusField
        options={statusCustomerString}
        value={filters['customerStatus']}
        onChange={(value: string) => {
          updateFilter('customerStatus', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
        renderOptionDisplayValueCustomers(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValueCustomers(selected)}
        dropdownClassName="!z-10"
        className={'w-auto'}
        {...(isMediumScreen && {
          label: 'customerStatus',
          labelClassName: 'font-medium text-gray-700',
        })}
      />
      {isFiltered ? (
        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  );
}
