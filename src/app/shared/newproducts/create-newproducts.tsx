'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select,RadioGroup,AdvancedRadio, CheckboxGroup, Checkbox, Button } from 'rizzui';
import { PhoneNumber } from '@/components/ui/phone-input';
import { PiCheckCircleFill, PiDownloadLight } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';


import {
  FormBlockWrapper,
} from '@/app/shared/invoice/form-utils';
import { AddContactsItems } from '@/app/shared/newcustomers/add-contacts-items';
import { toast } from 'react-hot-toast';
import {
  newcustomerFormSchema,
} from '@/utils/validators/update-newcustomer.schema';
// TYPES
import { IModel_NewProducts, IModel_Errorgateway } from "@/types";
//import { INewProduct } from '@/types/models/newcustomers';
import UploadZone from '@/components/ui/file-upload/newcustomers-upload';
// SERVICES
import { HttpService } from "@/services";
import {
  states,yesnoanswer, properties_services, properties_ethnias, weekdays,properties_extra
} from '@/app/shared/newcustomers/select-options';

import GeneralErrorCard from '@/components/cards/general-error-card';

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';


type ValuePiece = Date | string | string[] | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];



export default function CreateNewProducts({
  id,
  record,
  subcategories,
  years,
  brands,
  uoms
}: {
  id: string;
  record?: IModel_NewProducts.INewProduct;
  brands: {value:string, label:string}[] | undefined;
  uoms: {value:string, label:string}[] | undefined;
  years: {value:string, label:string}[] | undefined;
  subcategories: {value:string, label:string, categoryId:string}[] | undefined;

}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false); 


  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);
  const [descriptionAuto, setDescriptionAuto] = useState("");
  const [nameAuto, setNameAuto] = useState("");
  const [brandAuto, setBrandAuto] = useState("");


  
  const { push } = useRouter();


  useEffect(() => {
    // action on update of movies
   
}, [errormessage]);

const onCancel = () => {
  //routes.newcustomers.home
} 
const delay = ms => new Promise(res => setTimeout(res, ms));

const onChangeDescription = async () => {
  await delay(100);
  setDescriptionAuto(brandAuto + " " + nameAuto)
  await delay(100);
  setDescriptionAuto(brandAuto + " " + nameAuto)


} 

const onSendtoSales=  async () => {

  alert("Enviando a ventas..")
  push(routes.newproducts.edit_commercial("00000"));



//   const http = new HttpService();
//   setLoading(true);
//   setShowError(true);
// const dataupdate: IModel_NewProducts.updateNewProductToSales ={
//   approved:true,
//   sendNotification:true,
//   productId: parseInt(id),
//   userId: "Services"
// }

//   const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.updateNewProductToSales>(`/Items/Items/AppLimena/Sales`,"", dataupdate);


//   setTimeout(() => {
//     setLoading(false);

// if(response.succeeded){
//       console.log('JSON FINAL data ->', JSON.stringify(dataupdate));

//     toast.success(<Text as="b">Customer successfully {id ? 'updated' : 'created'}</Text> );
//     push(routes.newcustomers.home);
//     }else{
//     const final : any=response;
//     const errorResp=final as IModel_Errorgateway.IError_gateway;
//     setErrorMessage(errorResp.response)
//     console.log("Complete error log",errorResp)
//     toast.error(
//       <Text as="b">Error when update customer, please check log at bottom page or contact IT Support</Text>
//     );
//     setShowError(false);
//     }



//       }, 600);

} 

//Guardar DRAFT
  const onSubmit: SubmitHandler<IModel_NewProducts.INewProduct> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);


    const dataupdate ={
      id: data.id,
    }


//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.updateNewProduct>(`/Items/Items/AppLimena`, "",dataupdate);
  
console.log(response)

    setTimeout(() => {
      setLoading(false);

if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));

  toast.success(
    <Text as="b">Customer successfully {id ? 'updated' : 'created'}</Text>
  );
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
  };


   return (
    <>
    <Form<IModel_NewProducts.INewProduct>
      //validationSchema={newcustomerFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch,getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title={'General Information'}
                description={''}
              >
                <Controller
          control={control}
          name="brand"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Brand"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={async (selected: string) =>{
                var brandname= brands?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
                console.log(brandname)
                setBrandAuto(brandname)
                await delay(100);
                onChangeDescription()
              }}
              options={brands}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                brands?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />
                <Input
                  label="Name"
                  
                  placeholder="Enter product's name"
                  onChange={async (item) =>{
                    console.log(item.target.value)
                    setNameAuto(item.target.value)
                    await delay(100);
                    onChangeDescription()
                  }}
                  //{...register('productName')}
                />
                <Input
                  label="Description"
                  readOnly
                  value={descriptionAuto}
                  placeholder="(Brand + Product's Name)"
                  {...register('description')}
                />
 
 <Controller
          control={control}
          name="subcategory"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Subcategory"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={subcategories}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                subcategories?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />
         <Input
                  label="Unit Barcode"
                  type={"number"}
                  placeholder=""
                  {...register('barcode')}
                />
             
             <Controller
          control={control}
          name="uom"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Unit of Measure (UoM)"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={uoms}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                uoms?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />

<Input
                  label="Case Barcode"
                  
                  placeholder=""
                  {...register('barcodecase')}
                />

         


<Input
                  label="Arrival Date"
                  type={"date"}
                  placeholder=""
                  {...register('arrivaldate')}
                />
    <Controller
          control={control}
          name="developmentyear"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Development year"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={years}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                years?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />
                <div>
     
   
                </div>

            
             

                

<div>
  

                
     
</div>
                  
              </FormBlockWrapper>
              <FormBlockWrapper
                title="Additional Information"
                description=""
                
              >
                <Input
                className='mt-4'
                  label="Vendor's itemcode"
                  placeholder=""
                  {...register('itemcodeVendor')}
                />
           <Controller
          control={control}
          name="itemcodePurchase"
          render={({ field: { value, onChange } }) => (
            <Select
              label="UoM Purchase"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
                className='mt-4'
              value={value}
              onChange={onChange}
              options={uoms}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                uoms?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />
                 
                 <Input
                  label="FOB CASE ($)"
                  type={"number"}
                  placeholder=""
                  {...register('FOBCase')}
                />
        
        <Input
                  label="FOB UNIT ($)"
                  type={"number"}
                  placeholder=""
                  {...register('FOBUnit')}
                />

<Input
                  label="CIF NASH CASE ($)"
                  type={"number"}
                  placeholder=""
                  {...register('CIFNashCase')}
                />
                <Input
                  label="CIF NASH UNIT ($)"
                  type={"number"}
                  placeholder=""
                  {...register('CIFNashUnit')}
                />
                  <Input
                  label="Delivery time (days)"
                  type={"number"}
                  placeholder=""
                  {...register('DeliveryTimeDays')}
                />
              </FormBlockWrapper>
             


            </div>
          </div>
          <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        negMargin
      )}
    >

      <Link  href={routes.newcustomers.home} >
          Back to list
      </Link>

      <Button
        variant="solid"
        color="secondary"
        className="w-full @xl:w-auto"
        type="submit"
        isLoading={isLoading}
      >
        Save draft
      </Button>
      <Button onClick={onSendtoSales}  className="w-full @xl:w-auto">
        Send to Sales
      </Button>
    </div>
   </>
      )}
    </Form>
{!showerror ? (
      <GeneralErrorCard key={Math.random()} data={errormessage}/>
) : null}
        </>

  );
 //} else{

    //return <>Loading information...</>;
  //}


  
}
