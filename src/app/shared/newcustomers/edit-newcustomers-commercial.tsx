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
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
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

export default function EditNewCustomersCommercial({
  id,
  record,
  salesreps,
  salessupervisors,
  salesroutes,
  pricelistvalues,
  sapcustomers,
}: {
  id: string;
  record?: IModel_NewCustomers.INewCustomer;
  salesreps: {value:string, label:string}[] | undefined;
  salessupervisors: {value:string, label:string}[] | undefined;
  salesroutes: {value:string, label:string}[] | undefined;
  pricelistvalues: {value:string, label:string}[] | undefined;
  sapcustomers: {value:string, label:string}[] | undefined;
}) {
  const [isLoading, setLoading] = useState(false); 
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  //Selects
  const [showerror, setShowError] = useState(true);
  // const [salesrepselected, setSalesRepSelected] = useState(0);
  // const [salesrouteselected, setSalesRouteSelected] = useState("");
  // const [salessupelected, setSalesSupSelected] = useState(0);
  const [weekdayOne, setWeekDayOne] = useState(0);
  const [weekdayTwo, setWeekDayTwo] = useState(0);
  const [weekdayThree, setWeekDayThree] = useState(0);
  const [weekdayFour, setWeekDayFour] = useState(0);

  console.log("BP", sapcustomers)
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
    

    let weekdaysfinal: IModel_NewCustomers.ISchedulersUpdate[] = [];

   //Properties originales a eliminar
   record?.schedulers.filter(c=>c.type==1).map(item => {
    const lastscheduler: IModel_NewCustomers.ISchedulersUpdate ={
      id:item.id,
      weekNum:item.week,
      dayNum:item.day,
      deleted:true       
    }
    weekdaysfinal?.push(lastscheduler); //Hacemos un solo array
  });


    if(weekdayOne!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:1,
        dayNum:weekdayOne,
        id:0,
        deleted:false
      }
      weekdaysfinal.push(item)
    }

    if(weekdayTwo!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:2,
        dayNum:weekdayTwo,
        id:0,
        deleted:false
      }
      weekdaysfinal.push(item)
    }
    if(weekdayThree!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:3,
        dayNum:weekdayThree,
        id:0,
        deleted:false
      }
      weekdaysfinal.push(item)
    }
    if(weekdayFour!=0){
      const item: IModel_NewCustomers.ISchedulersUpdate ={
        weekNum:4,
        dayNum:weekdayFour,
        id:0,
        deleted:false
      }
      weekdaysfinal.push(item)
    }
//data.priceList =-1;
//console.log("ACTUAL PRICE LIST", data.priceList)

const pricelistdef = data.priceList <0 ? 1 : data.priceList;

if(data.fatherCard=="-"){
  data.fatherCard="";
}
if(data.isSeparatedInvoices==null){
  data.isSeparatedInvoices=false;
}
if(data.payWithCreditCard==null){
  data.payWithCreditCard=false;
}
//console.log("PRICE LIST CHECK", pricelistdef)
    const dataupdate ={
      customerId: data.id,
      salesRepId: data.salesRepId,
      supervisorId: data.supervisorId,
      salesRouteId: data.salesRouteId,
      billWithBarcode: data.billWithBarcode,
      isRiteFill:false,// data.isRiteFill,
      sendNotification: true,
      budget: isNaN(data.budget) ? 0 : data.budget,
      schedulers: weekdaysfinal,
      visitFrequency: data.visitFrequency,
      priceList: pricelistdef,//data.priceList,
      fatherCard: data.fatherCard,
      userId:"Services",
      IsSeparatedInvoices: data.isSeparatedInvoices,
      PayWithCreditCard:data.payWithCreditCard,
    }

    console.log("Data to send->", dataupdate)


//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomertoCommercial>(`/Customers/Customers/AppLimena/Sales`,"", dataupdate);
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
            Customer: {record.customerName}
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title="Sales"
                description=""
                
              >               
               <Controller
          control={control}
          name="salesRepId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Sales Representative"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={value.toString()}
              onChange={onChange}
              options={salesreps}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                salesreps?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />        
            )}
            />
            <Controller
          control={control}
          name="supervisorId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Sales Supervisor"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              defaultValue={0}
              value={value.toString()}
              onChange={onChange}
              options={salessupervisors}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                salessupervisors?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />  
  
            )}
            />
<Controller
          control={control}
          name="salesRouteId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Sales Route"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={salesroutes}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                salesroutes?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
              />
            
            )}
            />
<Controller
          control={control}
          name="billWithBarcode"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Bill with barcode format?"
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
           <Input
                  label="Budget"
                  
                  placeholder="Enter customer budget"
                  {...register('budget')}
                  //error={errors.customerName?.message}
                />
          {/* <Controller
          control={control}
          name="isRiteFill"
          
          render={({ field: { value, onChange } }) => (
            <Select
              label="Is RiteFill Customer?"
              labelClassName="text-gray-900 "
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
        /> */}

<Controller
          control={control}
          name="priceList"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Price List"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={pricelistvalues}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                pricelistvalues?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />
          )}
        />


                 <Controller
          control={control}
          name="fatherCard"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Business Partner"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={sapcustomers}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                sapcustomers?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />
          )}
        />

<Controller
          control={control}
          name="PayWithCreditCard"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Pay with Credit Card"
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

<Controller
          control={control}
          name="IsSeparatedInvoices"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Separated Invoices?"
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
                title="Visit information"
                description=""
                
              >
                       

        <label className='mt-4'>Visit Frecuency</label>
                 <Controller
        name="visitFrequency"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4 @lg:grid-cols-4"
          >
            <AdvancedRadio
              value="1"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">ONCE BY PERIOD</span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">1/ Period</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="2"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">BI-WEEKLY </span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">2 / Period</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="4"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">WEEKLY </span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">4 / Period</p>
            </AdvancedRadio>
          </RadioGroup>
        )}
      />

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
        Send to Operations
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
