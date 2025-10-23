'use client';
import { Badge, Text, Button } from 'rizzui';
// TYPES
import { IModel_NewProducts, IModel_Errorgateway } from "@/types";
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { PiDownloadLight } from 'react-icons/pi';
import { formatDate } from '@/utils/format-date';


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
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="warning"  rounded='md' >
          IN PURCHASING
                </Badge>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="primary"  rounded='md' >
          IN MARKETING
                </Badge>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
        
          <Badge color="primary"  rounded='md' >
          IN FINANCES
                </Badge>
        </div>
      );
      case 4:
        return (
          <div className="flex items-center">
         
            <Badge color="danger"  rounded='md' >
            REFUSED
                </Badge>
          </div>
        );
          case 5:
            return (
              <div className="flex items-center">
                <Badge color="success"  rounded='md' >
                COMPLETED
                </Badge>
              </div>
            );
            case 6:
              return (
                <div className="flex items-center">
                  <Badge color="success"  rounded='md' >
                  IN SAP
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

export default function NewProductsDetails({
  id,
  record,
  subcategories,
  internalcategories,
  brands,
  uoms,
  uomsGroup,
  vendors,
  storagetype,
}: {
  id: string;
  record: IModel_NewProducts.IProduct;
  internalcategories: {value:string, label:string}[] | undefined;
  brands: {value:string, label:string}[] | undefined;
  uoms: {value:string, label:string}[] | undefined;
  uomsGroup: {value:string, label:string, uoms:[]}[] | undefined;
  subcategories: {value:string, label:string, categoryId:string}[] | undefined;
  vendors: {value:string, label:string}[] | undefined;
  storagetype: {value:string, label:string}[] | undefined;

}) {

  console.log("Product data->",record)

  return (
    <> 
    {/* General information */}
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
        <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Creation Date:</span>
        <span className="text-base font-semibold text-gray-900">
             {formatDate(record.createdDate, 'MMMM D, YYYY')}
        </span>
      </li>
    <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">SAP Code:</span>
        <span className="text-base font-semibold text-gray-900">
          {record.sapCode}
        </span>
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Name:</span>
        <span className="text-base font-semibold text-gray-900">
          {record.productName}
        </span>
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Description:</span>
        <span className="text-base font-semibold text-gray-900">
          {record.description}
        </span>
      </li>
   
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Brand :</span>
        {brands?.find((c) => c.value === record.brand.toString())?.label.toLocaleUpperCase()
        }
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Subcategory :</span>

        {subcategories?.find((c) => c.value === record.subCategory.toString())?.categoryId.toLocaleUpperCase()} -         {subcategories?.find((c) => c.value === record.subCategory.toString())?.label.toLocaleUpperCase()}

      </li>
      <li className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">Status :</span>
      {getStatusBadge(record.status)}
      </li>
      <li className='flex items-center gap-3'>
      {record.urlImage.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record.urlImage} >
                  Show image
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}
      </li>
    </ul>

      <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">
           <li key={Math.random()} className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Last Updated Date:</span>
        <span >
             {formatDate(record.updatedDate, 'MMMM D, YYYY')}
        </span>
      </li>
      <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Unit Barcode :</span>
            <span>{record.barcodeEach}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Unit of Measure Group :</span>
        {uomsGroup?.find((c) => c.value === record.uoMGroup.toString())?.label.toLocaleUpperCase()}

          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Arrival Date :</span>
            <span> {formatDate(record.estimatedArrival, 'MMMM D, YYYY')}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Development Year :</span>
            <span>{record.developmentYear}</span>
          </li>
       

      </ul>    
  </div>
  

{/* Purchasing Information */}

<div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
  <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Vendor :</span>
      {vendors?.find((c) => c.value === record.vendor.toString())?.label.toLocaleUpperCase()}

    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Vendor's Itemcode :</span>
      {record.vendorItemCode}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Purchasing UoM Code :</span>
      {uoms?.find((c) => c.value === record.purchasingUomCode.toString())?.label.toLocaleUpperCase()}

    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Lead Time (days) :</span>
      {record.leadTime}
    </li>

  </ul>
  <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">
      <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">FOB Case :</span>
            <span>${record.fobCase}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">FOB Unit :</span>
            <span>${record.fobUnit}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">CIF Smyrna Case :</span>
            <span>${record.cifSmyrnaCase}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">CIF Smyrna Unit :</span>
            <span>${record.cifSmyrnaUnit}</span>
          </li>
       

      </ul> 

</div>


{/* Sales Information */}

<div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
  <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Suggested MRG :</span>
      {record.suggestedMrg} %
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Suggested Main List Price :</span>
      ${record.suggestedMainListPrice}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Main List Price Calculated :</span>
      ${record.mainListPrice}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">MRG Calculated :</span>
      {record.margin}%
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">SRP :</span>
      ${record.suggestedSrp}
    </li>
  </ul>
    <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">           
    <span className="font-semibold text-gray-900">Properties :</span>

    {record?.properties.filter(c=>!c.deleted).map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <span>{item.propertyNum} - {item.propertyName}</span>
        </li>
    ))}
    </ul> 
</div>
{/* Inventory Information */}

<div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
  
  <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Min Days Receipt :</span>
      {record.minDaysReceipt}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">Shelf Life Days :</span>
      {record.shelfLifeDay}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">TI :</span>
      {record.ti}
    </li>
    <li className="flex items-center gap-3 ">
      <span className="font-semibold text-gray-900">HI :</span>
      {record.hi}
    </li>

  </ul>
  <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">
      <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Cases Per Pallets :</span>
            <span>{record.casePerPallets}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Min Days Dispatch :</span>
            <span>{record.minDaysDispatch}</span>
          </li>
          {/* <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Storage Type :</span>
            <span>{record.storageType}</span>
          </li> */}
      </ul> 

</div>
      {/* MARKETING Department */}
      <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-3">
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0"> <h2>Marketing</h2>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Internal Category :</span>
        {record.internalCategory} - {record.internalCategory ? internalcategories.find((c) => c.value === record.internalCategory.toString())?.label.toLocaleUpperCase() : null}

      </li>


    </ul>

 
  
  </div>

        {/* Finantials Department */}
        <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-2 @3xl:p-8 @5xl:grid-cols-2">
    <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0"> <h2>Finances</h2>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Main List Unit Price:</span>
        ${record.mainListUnitPrice}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Minimum Profit :</span>
        {record.minimunProfit} 
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Commission :</span>
        {record.commission}
      </li>
      <li className="flex items-center gap-3 ">
        <span className="font-semibold text-gray-900">Commercial Return Reasons :</span>
        {record.returnReasons}
      </li>
    </ul>
    {/* <ul key={Math.random()} className="mt-3 grid gap-3 @5xl:mt-0">
      <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Diamon Factor :</span>
            <span>{record.diamondFactor}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Gold Factor :</span>
            <span>{record.goldFactor}</span>
          </li>
          <li key={Math.random()} className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Silver Factor :</span>
            <span>{record.silverFactor}</span>
          </li>
      </ul>  */}

  </div>
  </>
  );
}

