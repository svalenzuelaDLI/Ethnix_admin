'use client';

import Image from 'next/image';
import { Button, Text, Title, Badge, Collapse } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import LuggageTwoIcon from '@/components/icons/luggage-two';
import PlaneIcon from '@/components/icons/plane';
import { FlightingCardProps } from '@/types';
import { IModel_Errorgateway } from "@/types";
import { data } from '@/app/shared/logistics/shipment/details/tracking-history';

export default function GeneralErrorCard({
  data,
}: {
  data: IModel_Errorgateway.IResponse | undefined;
 
}) {
  return (
    <>
      <div  key={Math.random()} className="rounded-lg border border-muted">
        <AccordionContent data={data}/>
      </div>
    </>
  );
}


const badgeStyle = {
  Business: {
    color: 'success',
    className: 'dark:bg-[#05361e] dark:text-green-light',
  },
  Economy: {
    color: 'error',
    className: 'dark:bg-[#33095e] dark:text-secondary-light',
  },
  'First Class': {
    color: 'secondary',
    className: 'dark:bg-[#07274e] dark:text-blue-light',
  },
};


const AccordionContent = props => {

  const {data} =props;
 
  return (
    <Collapse key={Math.random()}
      header={({ open, toggle }) => (
        <div 
          onClick={toggle}
          className="flex cursor-pointer items-center justify-between gap-4 p-3 md:p-5"
        >
          <div className="flex gap-2 sm:items-center md:gap-4">
            <div className="relative aspect-square w-20">

            </div>
            <div className="sm:flex sm:flex-col">
              <Button
                size="sm"
                as="span"
                variant="flat"
                className="mb-2 h-6 rounded-md bg-secondary-lighter text-xs font-semibold text-secondary-dark sm:hidden dark:bg-secondary-dark dark:text-secondary-lighter"
              >
              </Button>
              <Title as="h5" className="font-semibold text-gray-900">Error log, please share this with IT Support Department</Title>

            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              rounded="md"
              variant="flat"
              // FIXME: Need to fixed this type error
              // @ts-ignore
              color={"danger"}
              className={cn(
                'hidden px-3.5 py-1 sm:block',
                // @ts-ignore
                badgeStyle["Economy"].className
              )}
            >
             {data?.status} - {data?.statusText}
            </Badge>
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500',
                open && 'bg-gray-900 text-gray-0'
              )}
            >
              <PiCaretDownBold
                strokeWidth={3}
                className={cn(
                  'h-3 w-3 rotate-180 transition-transform duration-200 rtl:-rotate-180',
                  open && 'rotate-0 rtl:rotate-0'
                )}
              />
            </div>
          </div>
        </div>
      )}
    >
      {/* Body */}
      <div className=" items-center justify-between gap-4 bg-gray-50 px-5 py-3 text-gray-500 dark:bg-gray-100">
       
        <span>{JSON.stringify(data?.data)}</span>
      </div>

    
    </Collapse>
  );
}
