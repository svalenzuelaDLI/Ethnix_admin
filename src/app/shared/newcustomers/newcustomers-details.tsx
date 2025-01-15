'use client';
import { Badge, Text, Button } from 'rizzui';
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { PiDownloadLight } from 'react-icons/pi';


function getDayName(day: number) {
  switch (day) {
    case 0:
      return (
       <label>SUNDAY</label>
      );
      case 1:
        return (
         <label>MONDAY</label>
        );
        case 2:
          return (
           <label>TUESDAY</label>
          );
          case 3:
            return (
             <label>WEDNESDAY</label>
            );
            case 4:
              return (
               <label>THURSDAY</label>
              );
              case 5:
                return (
                 <label>FRIDAY</label>
                );
                case 6:
                  return (
                   <label>SATURDAY</label>
                  );
  }
}


function getFrequencyName(value: string) {
  switch (value) {
    case "1":
      return (
       <label>ONCE BY PERIOD</label>
      );
      case "2":
        return (
         <label>BI-WEEKLY</label>
        );
        case "4":
          return (
           <label>WEEKLY</label>
          );
  }
}

function getYesNo(value: boolean) {
  switch (value) {
    case true:
      return (
       <label>YES</label>
      );
      case false:
        return (
         <label>NO</label>
        );
  }
}


function getStatusBadge(status: number) {
  switch (status) {
    case 9:
      return (
        <div className="flex items-center">
          <Badge color="warning"  rounded='md' >
          IN REVISION (FINANCE)
                </Badge>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="warning"  rounded='md' >
          IN REVISION (CUSTOMER SERVICE)
                </Badge>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="danger"  rounded='md' >
          REFUSED
                </Badge>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
        
          <Badge color="primary"  rounded='md' >
          COMMERCIAL
                </Badge>
        </div>
      );
      case 4:
        return (
          <div className="flex items-center">
         
            <Badge color="primary"  rounded='md' >
            OPERATIONS
                </Badge>
          </div>
        );
        case 5:
          return (
            <div className="flex items-center">
     
              <Badge color="primary"  rounded='md' >
              FINANTIALS
                </Badge>
            </div>
          );
          case 6:
            return (
              <div className="flex items-center">
                <Badge color="success"  rounded='md' >
                COMPLETED
                </Badge>
              </div>
            );
            case 7:
              return (
                <div className="flex items-center">
                  <Badge color="success"  rounded='md' >
                  IN SAP
                  </Badge>
                </div>
              );
            case 8:
      return (
        <div className="flex items-center">
       
          <Badge color="danger"  rounded='md' >
          SAVED IN SAP BUT PEPPERI ERROR
                </Badge>
        </div>
      );
            
    default:
      return (
        <div className="flex items-center">
         
          <Badge  rounded='md' >
          Unassigned def
                </Badge>
        </div>
      );
  }
}


export const getColumns = () => [
  {
    title: <span className="ms-6 block whitespace-nowrap">Name</span>,
    dataIndex: 'firstName',
    key: 'firstName',
    width: 200,
  },
  {
    title: <span className="block whitespace-nowrap">LastName</span>,
    dataIndex: 'lastName',
    key: 'lastName',
    width: 200,
  },
  {
    title: <span className="block whitespace-nowrap">Position</span>,
    dataIndex: 'position',
    key: 'position',
    width: 200,

  },
  {
    title: <span className="block whitespace-nowrap">Phone</span>,
    dataIndex: 'contactPhone',
    key: 'contactPhone',
    width: 200,

  },
  {
    title: <span className="block whitespace-nowrap">Email</span>,
    dataIndex: 'email',
    key: 'email',
    width: 200,

  },
];

export default function NewCustomersDetails({
  id,
  record,
}: {
  id: string;
  record: IModel_NewCustomers.INewCustomer;

}) {

  console.log("Customer data->",record)

  return (
    <>
    {/* General information */}
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Name:</span>
        <span className="text-base font-semibold text-gray-900">
          {record.customerName}
        </span>
      </li>
      <li className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">Status :</span>
      {getStatusBadge(record.status)}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Unified Federal TAX ID :</span>
        {record.federalTax}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Resales Tax Certificate Number :</span>
        {record.resalesTaxCertificate}
      </li>
      <li className='flex items-center gap-3'>
      {record.federalTaxImgeUrl.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record.federalTaxImgeUrl} >
                  Show Unified Federal TAX ID file
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}
      </li>
      <li className='flex items-center gap-3'>
      {record.resalesTaxCertificateImageUrl.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record.resalesTaxCertificateImageUrl} >
                  Show Resales Tax Certificate Number file
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}
      </li>

      <li className='flex items-center gap-3'>
      {record.commercialAgreement?.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record?.commercialAgreement} >
                  Show Risk Profile file
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}
      </li>
    </ul>

      <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">
     
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Store Phone Number :</span>
            <span>{record.storePhone}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Store Email :</span>
            <span>{record.storeEmail}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Website :</span>
            <span>{record.siteWeb}</span>
          </li>
       

          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Street :</span>
            <span>{record.street}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">City :</span>
            <span>{record.city}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Zipcode :</span>
            <span>{record.zipCode}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">State :</span>
            <span>{record.state}</span>
          </li>
      </ul>    
  </div>
  
{/* Contact list */}

  <BasicTableWidget
      title="Contact list"
      className={cn('pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0')}
      data={record.contacts}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />

{/* Additional Information */}

<div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
  <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Operation Time :</span>
      {record.operationTime}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Price List :</span>
      {record.priceList}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Unloading Dock :</span>
      {getYesNo(record.loadingDock)}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Receiving Zone :</span>
      {record.receivingZone}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Receiving Days :</span>
      {record.receivingDays}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Business Partner :</span>
      {record.fatherCard}
    </li>
  </ul>

    <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">           
    <span className="font-semibold text-gray-900">Properties :</span>

    {record.properties.filter(c=>!c.deleted).map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <span>{item.propertyNum} - {item.propertyName}</span>
        </li>
    ))}
    </ul> 
</div>

    {/* Commercial Department */}
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0"> <h2>Commercial</h2>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Sales Representative :</span>
        {record.salesRepId} - {record.salesRepName}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Supervisor :</span>
        {record.supervisorId} - {record.supervisorName}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Sales Route :</span>
        {record.salesRouteId} - {record.salesRouteName}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Budget :</span>
        ${record.budget}
      </li>
      
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Bill with barcode :</span>
        {getYesNo(record.billWithBarcode)}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Visit Frequency :</span>
        {getFrequencyName(record.visitFrequency)}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Accept Credit Card :</span>
        {getYesNo(record.payWithCreditCard)}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Separated Invoices :</span>
        {getYesNo(record.isSeparatedInvoices)}
      </li>
    </ul>

    <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">           
    <span className="font-semibold text-gray-900">Visit Frecuency Weeks :</span>

    {record.schedulers.filter(c=>c.type==1 && !c.deleted).map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <span>Week: {item.week}, Day: {getDayName(item.day)}</span>
        </li>
    ))}
    </ul>   
  </div>

      {/* Operations Department */}
      <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-3">
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0"> <h2>Operations</h2>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Delivery Route :</span>
        {record.deliveryRouteId} - {record.deliveryRouteName}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Accommodate Dairy :</span>
        {getYesNo(record.accommodateDairy)} 
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Supports Trailer :</span>
        {record.supportTrailerFldValue} - {record.supportTrailerDesc}
      </li>
    </ul>

    <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">           
    <span className="font-semibold text-gray-900">Preparation Information Weeks :</span>

    {record.schedulers.filter(c=>c.type==2 && !c.deleted).map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <span>Week: {item.week}, Day: {getDayName(item.day)}</span>
        </li>
    ))}
    </ul>   

    <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">           
    <span className="font-semibold text-gray-900">Delivery Information Weeks :</span>

    {record.schedulers.filter(c=>c.type==3 && !c.deleted).map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <span>Week: {item.week}, Day: {getDayName(item.day)}</span>
        </li>
    ))}
    </ul>   
  </div>

        {/* Finantials Department */}
        <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0"> <h2>Finantials</h2>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Payment Terms:</span>
        {record.paymentTermGrpNum} - {record.paymentTermName}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Credit Limit :</span>
        ${record.creditLimit} 
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Freight Income :</span>
        {getYesNo(record.freightIncome)}
      </li>
    </ul>

  </div>
  </>
  );
}

