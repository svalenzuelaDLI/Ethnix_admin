'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select, Button,CheckboxGroup } from 'rizzui';
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
  yesnoanswer, weekdaysnumbers
} from '@/app/shared/newcustomers/select-options';
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
export default function EditNewCustomersOperations({
  id,
  record,
  deliveryroutes,
  trucks,

}: {
  id: string;
  record?: IModel_NewCustomers.INewCustomer;
  deliveryroutes: {value:string, label:string}[] | undefined;
  trucks: {value:string, label:string}[] | undefined;

}) {
  const [isLoading, setLoading] = useState(false); 
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  //Selects
  const [showerror, setShowError] = useState(true);
  const [deliveryrouteselected, setDeliveryRouteSelected] = useState("");
  const [truckselected, setTruckSelected] = useState("");
  //preparation information
  const [weekdayOne, setWeekDayOne] = useState(0);
  const [weekdayTwo, setWeekDayTwo] = useState(0);
  const [weekdayThree, setWeekDayThree] = useState(0);
  const [weekdayFour, setWeekDayFour] = useState(0);
  //delivery information
  const [delweekdayOne, setDelWeekDayOne] = useState(0);
  const [delweekdayTwo, setDelWeekDayTwo] = useState(0);
  const [delweekdayThree, setDelWeekDayThree] = useState(0);
  const [delweekdayFour, setDelWeekDayFour] = useState(0);
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
    
    let preparationweekdaysfinal: IModel_NewCustomers.ISchedulersUpdate[] = [];
    let deliveryweekdaysfinal: IModel_NewCustomers.ISchedulersUpdate[] = [];

   //Properties originales a eliminar
   record?.schedulers.filter(c=>c.type==2).map(item => {
    const lastscheduler: IModel_NewCustomers.ISchedulersUpdate ={
      id:item.id,
      weekNum:item.week,
      dayNum:item.day,
      deleted:true       
    }
    preparationweekdaysfinal?.push(lastscheduler); //Hacemos un solo array
  });
  record?.schedulers.filter(c=>c.type==3).map(item => {
    const lastscheduler: IModel_NewCustomers.ISchedulersUpdate ={
      id:item.id,
      weekNum:item.week,
      dayNum:item.day,
      deleted:true       
    }
    deliveryweekdaysfinal?.push(lastscheduler); //Hacemos un solo array
  });


    if(weekdayOne!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:1,
        dayNum:weekdayOne,
        id:0,
        deleted:false
      }
      preparationweekdaysfinal.push(item)
    }
    if(weekdayTwo!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:2,
        dayNum:weekdayTwo,
        id:0,
        deleted:false
      }
      preparationweekdaysfinal.push(item)
    }
    if(weekdayThree!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:3,
        dayNum:weekdayThree,
        id:0,
        deleted:false
      }
      preparationweekdaysfinal.push(item)
    }
    if(weekdayFour!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:4,
        dayNum:weekdayFour,
        id:0,
        deleted:false
      }
      preparationweekdaysfinal.push(item)
    }
    //Delivery
    if(delweekdayOne!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:1,
        dayNum:delweekdayOne,
        id:0,
        deleted:false
      }
      deliveryweekdaysfinal.push(item)
    }
    if(delweekdayTwo!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:2,
        dayNum:delweekdayTwo,
        id:0,
        deleted:false
      }
      deliveryweekdaysfinal.push(item)
    }
    if(delweekdayThree!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:3,
        dayNum:delweekdayThree,
        id:0,
        deleted:false
      }
      deliveryweekdaysfinal.push(item)
    }
    if(delweekdayFour!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:4,
        dayNum:delweekdayFour,
        id:0,
        deleted:false
      }
      deliveryweekdaysfinal.push(item)
    }

    const dataupdate ={
      customerId: data.id,
      deliveryRouteId: data.deliveryRouteId,
      supportTrailerValue: data.supportTrailerFldValue,
      accommodateDairy: data.accommodateDairy,
      sendNotification: true,
      preparationScheduler: preparationweekdaysfinal,
      deliverycheduler: deliveryweekdaysfinal,
      userId:"Services"
    }

    console.log("Data to send->", dataupdate)


//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomertoOperations>(`/Customers/Customers/AppLimena/Operations`, "",dataupdate);
  
//console.log(response)

    
    setTimeout(() => {
      setLoading(false);

if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));

  toast.success(
    <Text as="b">Customer successfully {id ? 'updated' : 'created'}</Text>
  );
  push(routes.newcustomers.home);

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
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title="Delivery Information"
                description=""
                
              >               
            <Controller
          control={control}
          name="deliveryRouteId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Delivery Route"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={deliveryroutes}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                deliveryroutes?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />        
          )}
          />
           <Controller
          control={control}
          name="supportTrailerFldValue"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Supports Trailer"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={trucks}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                trucks?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />  
          )}
          />
<Controller
          control={control}
          name="accommodateDairy"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Dairy accommodate?"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
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
 

              </FormBlockWrapper>
             



<FormBlockWrapper
                title="Preparation and delivery information"
                description=""
                
              >
                       
<label className='mt-4'>Preparation week/days</label>
<div className="col-span-full grid gap-4 @lg:grid-cols-4"> 
<Select
              label="Week 1"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={weekdayOne}
              onChange={setWeekDayOne}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />  
            <Select
              label="Week 2"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={weekdayTwo}
              onChange={setWeekDayTwo}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
            <Select
              label="Week 3"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={weekdayThree}
              onChange={setWeekDayThree}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
            <Select
              label="Week 4"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={weekdayFour}
              onChange={setWeekDayFour}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
</div>

<label className='mt-4'>Delivery week/days</label>
<div className="col-span-full grid gap-4 @lg:grid-cols-4"> 
<Select
              label="Week 1"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={delweekdayOne}
              onChange={setDelWeekDayOne}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />  
            <Select
              label="Week 2"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={delweekdayTwo}
              onChange={setDelWeekDayTwo}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
            <Select
              label="Week 3"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={delweekdayThree}
              onChange={setDelWeekDayThree}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
            <Select
              label="Week 4"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={delweekdayFour}
              onChange={setDelWeekDayFour}
              options={weekdaysnumbers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                weekdaysnumbers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            /> 
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
        Send to Finance
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
