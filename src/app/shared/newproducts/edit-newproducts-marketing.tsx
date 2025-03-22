'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select,RadioGroup,AdvancedRadio, Button } from 'rizzui';
import { PiCheckCircleFill } from 'react-icons/pi';
import cn from '@/utils/class-names';
import {
  FormBlockWrapper,
} from '@/app/shared/invoice/form-utils';
import { toast } from 'react-hot-toast';
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway, IModel_NewProducts } from "@/types";
// SERVICES
import { HttpService } from "@/services";
import {
  yesnoanswer, weekdaysnumbers, visitfrecuency
} from '@/app/shared/newcustomers/select-options';
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';
import { parseInt, values } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { year } from 'date-arithmetic';

export default function EditNewProductsMarketing({
  id,
  record,
  years,
  internalcategories,
}: {
  id: string;
  record?: IModel_NewProducts.IProduct | undefined;
  years: {value:string, label:string}[] | undefined;
  internalcategories: {value:string, label:string}[] | undefined;
}) {
  const [isLoading, setLoading] = useState(false); 
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  //Selects
  const [showerror, setShowError] = useState(true);
  const [categoryValue, setCategoryValue] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    // action on update of movies
   
}, [errormessage]);

const onCancel = () => {

} 

const onSendtoSAP = () => {
  alert("Enviando a SAP..")
  push(routes.newproducts.home);

} 

const onSendtoFinancials = () => {
  alert("Enviando a finanzas..")
  push(routes.newproducts.edit_finantials("00000"));

} 

  const onSubmit: SubmitHandler<IModel_NewProducts.updateNewProductToMarketing> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);
    


//Enviamos update
const dataupdate ={
   itemId: parseInt(id),
  developmentYear: record?.developmentYear,
  internalCategory: categoryValue,
  userId: "Services",
  sendToFinance: true,
  sendNotification: true
}

console.log("Data to send->", dataupdate)
console.log("Data to send->", JSON.stringify(dataupdate))


//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.updateNewProductToMarketing>(`/items/v2/items/AppLimena/Marketing`, "",dataupdate);
//console.log(response)

    
    setTimeout(() => {
      setLoading(false);

if(response.succeeded){


  toast.success(
    <Text as="b">Product sent to Financials</Text>
  );
  push(routes.newproducts.home);

}else{
  const final : any=response;
  const errorResp=final as IModel_Errorgateway.IError_gateway;
  setErrorMessage(errorResp.response)
  console.log("Complete error log",errorResp)
  toast.error(
    <Text as="b">Error updating product, please check log at bottom page or contact IT Support</Text>
  );
  setShowError(false);
}
    }, 600);
  };


 if(record){

   return (
    <>
    <Form<IModel_NewProducts.updateNewProductToMarketing>
      //validationSchema={newcustomerFormSchema}
      //resetValues={reset}
      onSubmit={onSubmit}

      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch,getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
          Product: {record?.productName} <br></br>
          Subcategory: {record?.subCategory}
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title="Marketing"
                description=""
                
              >               
               <Controller
          control={control}
          name="internalCategory"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Internal Category:"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={categoryValue}

              //value={value.toString()}
              onChange={(selected: string) =>{
                setCategoryValue(selected);


              }}
              options={internalcategories}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                internalcategories?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />        
            )}
            />
    <Input
                  label="Product Development"
                  value={record?.developmentYear}
                  readOnly
                />

{categoryValue=="DIS" ? (
      <p>Al seleccionar esta categoria, el producto no pasa por revision de Finanzas y se crea directamente en SAP (solo aplica para DISPLAY)</p>
   ) :null}
{/* <Controller
          control={control}
          name="salesRouteId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Supermarket department"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              //value={value}
              onChange={onChange}
              options={salesroutes}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                salesroutes?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
              />
            
            )}
            /> */}

         


              </FormBlockWrapper>
             




            </div>
          </div>
          <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        negMargin
      )}
    >
  <Link  href={routes.newproducts.home} >
          Back to list
      </Link>

   {categoryValue=="DIS" ? (
       <Button    
       isLoading={isLoading} onClick={onSendtoSAP}   className="w-full @xl:w-auto">
       Send to SAP
     </Button>
   ) : (
   <Button    
   isLoading={isLoading}   type="submit"  className="w-full @xl:w-auto">
   Send to Financials
 </Button>
   )}
   
    </div>
   </>
      )}
    </Form>
{!showerror ? (
      <GeneralErrorCard key={Math.random()} data={errormessage}/>
) : null}
        </>

  );
 } else{

    return <>Loading information...</>;
  }


  
}
