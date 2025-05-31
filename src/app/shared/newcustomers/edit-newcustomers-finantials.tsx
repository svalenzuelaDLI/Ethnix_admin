'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select,RadioGroup,AdvancedRadio, Button, Checkbox, CheckboxGroup } from 'rizzui';
import { PiCheckCircleFill,PiDownloadLight } from 'react-icons/pi';
import cn from '@/utils/class-names';
import {
  FormBlockWrapper,
} from '@/app/shared/invoice/form-utils';
import { toast } from 'react-hot-toast';
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
// SERVICES
import { HttpService } from "@/services";
import {
  yesnoanswer, weekdaysnumbers, visitfrecuency, properties_extra
} from '@/app/shared/newcustomers/select-options';
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';
import { parseInt } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/ui/file-upload/newcustomers-upload';

export default function EditNewCustomersFinantials({
  id,
  record,
  paymentterms,
  propertiesvalues,
}: {
  id: string;
  record?: IModel_NewCustomers.INewCustomer;
  paymentterms: {value:string, label:string}[] | undefined;
  propertiesvalues: string[];
}) {
  const [isLoading, setLoading] = useState(false); 
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  //Selects
  const [showerror, setShowError] = useState(true);
  const [paymenttermselected, setPaymentTermSelected] = useState("");
  const [propertiesvaluesToSend, setPropertiesValuesToSend] = useState(propertiesvalues);

  const { push } = useRouter();

  useEffect(() => {
    // action on update of movies
   
}, [errormessage]);

const onCancel = () => {

} 

const onSendtoOperations = () => {
  
} 

  const onSubmit: SubmitHandler<IModel_NewCustomers.INewCustomer> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);
    
    const dataupdate ={
      customerId: data.id,
      creditLimit: data.creditLimit,
      freightIncome: data.freightIncome,
      sendToSap: true,
      sendNotification: true,
      paymentTermGroupNum: paymenttermselected,
      commercialAgreement: data.commercialAgreement,
      userId:"Services"
    }

    console.log("Data to send->", JSON.stringify(dataupdate))


//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomertoFinantials>(`/Customers/Customers/AppLimena/Finances`,"", dataupdate);
  

console.log(response)

    
    setTimeout(() => {
      setLoading(false);

      if(response.succeeded){
  toast.success(
    <Text as="b">Customer successfully sent to SAP</Text>
  );
  push(routes.newcustomers.home);
}else{
  const final : any=response;
  const errorResp=final as IModel_Errorgateway.IError_gateway;
  setErrorMessage(errorResp.response)
  console.log("Complete error log",errorResp)
  toast.error(
    <Text as="b">Error when updating customer, please check log at bottom page or contact IT Support</Text>
  );
  setShowError(false);
}



    }, 600);
  };


 if(record){

   return (
    <>
    <Form<IModel_NewCustomers.INewCustomer>
      //validationSchema={newcustomerFormSchema}
      //resetValues={reset}
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
          Customer: {record.customerName}

     <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title="Payment Information"
                description=""
                className='mb-4'
              >     
                        
       <div>
            <Select
              label="Payment Terms"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={paymenttermselected}
              onChange={setPaymentTermSelected}
              options={paymentterms}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                paymentterms?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />        
            </div>
            <Input
                  label="Credit Limit"
                  
                  placeholder="Enter credit limit"
                  {...register('creditLimit')}
                  //error={errors.customerName?.message}
                />
    <div>
<Controller
          control={control}
          name="freightIncome"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Freight Income"
              labelClassName="text-gray-900"
              dropdownClassName="gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={yesnoanswer}
              getOptionValue={(option) => option.value}
              displayValue={(selected: boolean) =>
                yesnoanswer?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />
          )}
        />
        </div>
      <div className=''>

<UploadZone
label="Risk profile"
   propertyname='commercialAgreement'
 name="images3"
 getValues={getValues}
 setValue={setValue}
/> 
               <label>Risk Profile File</label><br></br>

{(record.commercialAgreement) ? record.commercialAgreement.includes("http") ? <> 
<Button color='primary' className="w-full @xl:w-auto mt-4">
         <Link target='_blank'  href={record.commercialAgreement} >
 Show file
</Link>
<PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

</Button>
</> : null: null}


</div>


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

  
      <Button    type="submit"
        isLoading={isLoading}  className="w-full @xl:w-auto">
        Send to SAP
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
 } else{

    return <>Loading information...</>;
  }


  
}
