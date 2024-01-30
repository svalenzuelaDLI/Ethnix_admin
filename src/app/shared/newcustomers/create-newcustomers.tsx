'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select, Textarea,RadioGroup,AdvancedRadio, CheckboxGroup, Checkbox, Title } from 'rizzui';
import { PhoneNumber } from '@/components/ui/phone-input';
import { DatePicker } from '@/components/ui/datepicker';
import { PiCheckCircleFill } from 'react-icons/pi';

import {
  FormBlockWrapper,
  statusOptions,
  renderOptionDisplayValue,
} from '@/app/shared/invoice/form-utils';
import { AddContactsItems } from '@/app/shared/newcustomers/add-contacts-items';
import FormFooter from '@/components/form-footer';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';
// TYPES
import { IModel_NewCustomers } from "@/types";
import { INewCustomer } from '@/types/models/newcustomers';
import UploadZone from '@/components/ui/file-upload/upload-zone';

import {
  states,yesnoanswer, properties_services, properties_ethnias
} from '@/app/shared/newcustomers/select-options';


import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];



export default function CreateNewCustomers({
  id,
  record,
}: {
  id?: string;
  record?: INewCustomer;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

//Default value

const [timerangevalue, onChangeTimerange] = useState<Value>(['10:00', '11:00']);
const [propiertiesservicesvalues, setPropertiesServicesValues] = useState<string[]>([]);
const [propiertiesethniasvalues, setPropertiesEthniasValues] = useState<string[]>([]);


  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    toast.success(
      <Text as="b">Invoice successfully {id ? 'updated' : 'created'}</Text>
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createInvoice data ->', data);
      setReset({
        fromName: '',
        fromAddress: '',
        fromPhone: '',
        toName: '',
        toAddress: '',
        toPhone: '',
        shipping: '',
        discount: '',
        taxes: '',
        createDate: new Date(),
        status: 'draft',
        items: invoiceItems,
      });
    }, 600);
  };

  // const newItems = record?.items
  //   ? record.items.map((item) => ({
  //       ...item,
  //     }))
  //   : invoiceItems;

 if(record){
   return (
    <Form<INewCustomer>
      //validationSchema={invoiceFormSchema}
      resetValues={reset}
      //onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...record,
          //invoiceNumber: 'INV-0071',
          //createDate: new Date(),
          // status: 'draft',
          //items: newItems,
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
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('customerName')}
                  error={errors.customerName?.message}
                />
                <Controller
                  name="storePhone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Store Phone Number"
                      country="US"
                      value={"1"+value}
                      onChange={onChange}
                    />
                  )}
                />
 
                  <Input
                  label="Store Email"
                  placeholder="Enter the store email"
                  {...register('storeEmail')}
                  error={errors.storeEmail?.message}
                />
                <Input
                  label="Website url"
                  placeholder="Enter the url of the website store"
                  {...register('siteWeb')}
                  error={errors.siteWeb?.message}
                />

              <Input
                  label="Unified Federal Tax ID"
                  placeholder="Enter the Federal Tax ID"
                  {...register('federalTax')}
                  error={errors.federalTax?.message}
                />
                <Input
                  label="Resales Tax Certificate Number"
                  placeholder="Enter the Resales Tax Certificate Number"
                  {...register('resalesTaxCertificate')}
                  error={errors.resalesTaxCertificate?.message}
                />
                 <UploadZone
                label="Unified Federal Tax ID image"

                  name="images"
                  getValues={getValues}
                  setValue={setValue}
                />


                  <UploadZone
                  label="Resales Tax Certificate Number"
                  name="images2"
                  getValues={getValues}
                  setValue={setValue}
                  
                />
              </FormBlockWrapper>
              <FormBlockWrapper
                title="Address"
                description=""
                
              >
                <Input
                className='mt-4'
                  label="Street"
                  placeholder="Enter the Street"
                  {...register('street')}
                  error={errors.street?.message}
                />
                <Input
                  label="City"
                  className='mt-4'
                  placeholder="Enter the City"
                  {...register('city')}
                  error={errors.city?.message}
                />
                 
                 <Input
                  label="Zip Code"
                  placeholder="Enter the Zip code"
                  {...register('zipCode')}
                  error={errors.zipCode?.message}
                />
                 <Controller
          control={control}
          name="state"
          render={({ field: { value, onChange } }) => (
            <Select
              label="State List"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={states}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                states?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              error={errors?.state?.message as string}
            />
          )}
        />
              </FormBlockWrapper>
             

              <AddContactsItems
                watch={watch}
                control={control}
                register={register}
                errors={errors}
              />


<FormBlockWrapper
                title="Additional information"
                description=""
                
              >
          <label className='mt-4'>Operation time</label>          
<div className='mt-4'>
 
<Controller
          control={control}
          name="operationTime"
          
          render={({ field: { value, onChange } }) => (
          <TimeRangePicker clearIcon={null}  disableClock={true} 
          onChange={onChangeTimerange} 
          value={timerangevalue}  />
          )}
        />
</div>
           
                <Input
                  label="Receiving Days"
                  placeholder="Receiving days"
                  {...register('city')}
                  error={errors.city?.message}
                />
                        <Controller
          control={control}
          name="loadingDock"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Unloading Dock"
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
              error={errors?.state?.message as string}
            />
          )}
        />
        <label>Receiving Zone</label>
                 <Controller
        name="receivingZone"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4 @lg:grid-cols-2"
          >
            <AdvancedRadio
              value="PUERTA PRINCIPAL (PARTE DELANTERA)"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">PUERTA PRINCIPAL</span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">PARTE DELANTERA</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="PUERTA DE DESCARGA (PARTE TRASERA)"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">PUERTA DE DESCARGA </span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">PARTE TRASERA</p>
            </AdvancedRadio>
          </RadioGroup>
        )}
      />



      
       


    
      
       
              </FormBlockWrapper>

              <FormBlockWrapper
                title="Services"
                description=""
                
              >
                
                <CheckboxGroup
            values={propiertiesservicesvalues}
            setValues={setPropertiesServicesValues}
            className="col-span-full grid gap-4 @lg:grid-cols-3 mt-4"
          >
               {properties_services.map((service) => (
              <Checkbox
                  key={service.code}
                  name="prop_services"
                  label={service.name}
                  value={service.code}
                  className="mb-5"
                  labelClassName="pl-2 text-sm font-medium !text-gray-900"
                  helperClassName="text-gray-500 text-sm mt-3 ms-8"
                />
              ))}
            
 
          </CheckboxGroup>
                
             
     </FormBlockWrapper>
     <FormBlockWrapper
                title="Ethnias"
                description=""
               
              >
      
            
         
          <CheckboxGroup
            values={propiertiesethniasvalues}
            setValues={setPropertiesEthniasValues}
            className="col-span-full grid gap-4 @lg:grid-cols-3 mt-4"
          >
               {properties_ethnias.map((service) => (
              <Checkbox
                  key={service.code}
                  name="prop_ethnias"
                  label={service.name}
                  value={service.code}
                  className="mb-5"
                  labelClassName="pl-2 text-sm font-medium !text-gray-900"
                  helperClassName="text-gray-500 text-sm mt-3 ms-8"
                />
              ))}
            
 
          </CheckboxGroup>
          </FormBlockWrapper>

            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
          />
        </>
      )}
    </Form>
  );
 } else{

    return <>Loading information...</>;
  }


  
}
