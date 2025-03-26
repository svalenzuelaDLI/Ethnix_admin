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
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
//import { INewCustomer } from '@/types/models/newcustomers';
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
import { scheduler } from 'timers/promises';


type ValuePiece = Date | string | string[] | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const invoiceItems = [
  { item: '', description: '', quantity: 1, price: undefined },
];



export default function CreateNewCustomers({
  id,
  record,
  propertiesvalues,
  receivingDaysvalues,
  operationtimevalue,
  pricelistvalues,
  sapcustomers,
}: {
  id: string;
  record?: IModel_NewCustomers.INewCustomer;
  propertiesvalues: string[];
  receivingDaysvalues: string[];
  operationtimevalue: string[];
  pricelistvalues: {value:string, label:string}[] | undefined;
  sapcustomers: {value:string, label:string}[] | undefined;

}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);  

  const [propertiesvaluesToSend, setPropertiesValuesToSend] = useState(propertiesvalues);
  const [receivingdaysvaluesToSend, setReceivingDaysValuesToSend] = useState(receivingDaysvalues);

  const [timerangevalue, onChangeTimerange] = useState<Value>(operationtimevalue);
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);

  const { push } = useRouter();


  useEffect(() => {
    // action on update of movies
   
}, [errormessage]);

const onCancel = () => {
  //routes.newcustomers.home
} 

const onSendtoCommercial =  async () => {


  const http = new HttpService();
  setLoading(true);
  setShowError(true);
const dataupdate: IModel_NewCustomers.updateNewCustomertoRevision ={
  approved:true,
  sendNotification:true,
  customerId: parseInt(id),
  userId: "Services"
}

  const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomertoRevision>(`/Customers/Customers/AppLimena/Revision`,"", dataupdate);


  setTimeout(() => {
    setLoading(false);

if(response.succeeded){
      console.log('JSON FINAL data ->', JSON.stringify(dataupdate));

    toast.success(<Text as="b">Customer successfully {id ? 'updated' : 'created'}</Text> );
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

} 

  const onSubmit: SubmitHandler<IModel_NewCustomers.INewCustomer> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);
    //Contactos originales a eliminar
    let contactstoUpload = record?.contacts.map(contact => {
      contact.deleted = true;
      return contact
    });

    //Verificamos nuevos contactos a agregar
    data.contacts.map(contact => {
      const newcontact: IModel_NewCustomers.IContacts ={
        id:0,
        customerId: parseInt(id),
        firstName: contact.firstName,
        lastName: contact.lastName,
        position: contact.position,
        contactPhone: contact.contactPhone,
        email: contact.email, 
        deleted:false       
      }
      contactstoUpload?.push(newcontact); //Hacemos un solo array
    });

   //Properties originales a eliminar
   let propertiesUpload = record?.properties.map(property => {
    property.deleted = true;
    return property
  });

      //Verificamos nuevas propiedades a agregar con la diferencia que tenemos que comparar con las
      //propiedades existentes sus nombres

      //SERVICIOS
      //Buscamos en el array de servicios y devolvemos la data de los seleccionados en los checkboxx
      const propertiesServicesSelected =  properties_services.filter((el) => {
        return propertiesvaluesToSend.some((f) => {
          return f === el.code;
          
        });
      });
      //Recorremos los seleccionados y damos formato de PUT Properties
      propertiesServicesSelected.map(property => {
        const newproperty: IModel_NewCustomers.IProperties ={
          id:0,
          customerId: parseInt(id),
          propertyNum: parseInt(property.code),
          propertyName: property.name,
          deleted:false       
        }
        propertiesUpload?.push(newproperty); //Hacemos un solo array
      });
          //ETHNIAS
      //Buscamos en el array de servicios y devolvemos la data de los seleccionados en los checkboxx
      const propertiesEthniasSelected =  properties_ethnias.filter((el) => {
        return propertiesvaluesToSend.some((f) => {
          return f === el.code;
        });
      });
      //Recorremos los seleccionados y damos formato de PUT Properties
      propertiesEthniasSelected.map(property => {
        const newproperty: IModel_NewCustomers.IProperties ={
          id:0,
          customerId: parseInt(id),
          propertyNum: parseInt(property.code),
          propertyName: property.name,
          deleted:false       
        }
        propertiesUpload?.push(newproperty); //Hacemos un solo array
      });


        //EXTRAS
      //Buscamos en el array de extras y devolvemos la data de los seleccionados en los checkboxx
      const propertiesExtrasSelected =  properties_extra.filter((el) => {
        return propertiesvaluesToSend.some((f) => {
          return f === el.code;
        });
      });
      //Recorremos los seleccionados y damos formato de PUT Properties
      propertiesExtrasSelected.map(property => {
        const newproperty: IModel_NewCustomers.IProperties ={
          id:0,
          customerId: parseInt(id),
          propertyNum: parseInt(property.code),
          propertyName: property.name,
          deleted:false       
        }
        propertiesUpload?.push(newproperty); //Hacemos un solo array
      });

      console.log("FATHER", data.fatherCard)
//Verificamos si se coloca propiedad price change enable
    // if(data.fatherCard=="-" && isEmpty(data.fatherCard)){
    //   const newpropertyaux: IModel_NewCustomers.IProperties ={
    //     id:0,
    //     customerId: parseInt(id),
    //     propertyNum: 26,
    //     propertyName: "ENABLE CHANGE PRICE",
    //     deleted:false       
    //   }
    //   propertiesUpload?.push(newpropertyaux); //Hacemos un solo array
    // }


    const dataupdate ={
      properties: propertiesUpload,
      contacts: contactstoUpload,
      id: data.id,
      customerName: data.customerName,
      storePhone: data.storePhone,
      storeEmail: data.storeEmail,
      siteWeb: data.siteWeb,
      federalTax: data.federalTax,
      federalTaxImgeUrl: data.federalTaxImgeUrl,
      resalesTaxCertificate: data.resalesTaxCertificate,
      resalesTaxCertificateImageUrl: data.resalesTaxCertificateImageUrl,
      commercialAgreement: data.commercialAgreement ? data.commercialAgreement : "",
      street: data.street,
      city: data.city,
      zipCode: data.zipCode,
      state: data.state,
      country: data.country,
      priceList: 1,//data.priceList,
      fatherCard: "",//data.fatherCard,
      operationTime: (timerangevalue as string[]).join(" - "),
      receivingDays: receivingdaysvaluesToSend.join(","),
      receivingZone: data.receivingZone,
      userId: "Services",
      loadingDock: data.loadingDock,
      //COMMERCIAL
      salesRepId: data.salesRepId,
      supervisorId: data.supervisorId,
      salesRouteId: data.salesRouteId,
      billWithBarcode: data.billWithBarcode,
      isRiteFill: data.isRiteFill,
      budget: isNaN(data.budget) ? 0 : data.budget,
      //schedulers: data.schedulers,
      visitFrequency: data.visitFrequency,
      PayWithCreditCard:data.payWithCreditCard ? data.payWithCreditCard : false,
      IsSeparatedInvoices: data.isSeparatedInvoices ? data.isSeparatedInvoices : false,
 
      //OPERATIONS
      deliveryRouteId: data.deliveryRouteId,
      supportTrailerValue: data.supportTrailerFldValue,
      accommodateDairy: data.accommodateDairy,
      //preparationScheduler: data.preparationScheduler,
      //deliverycheduler:data.deliverycheduler,
    }

    console.log("ACTUALIZANDO ESTOO:",dataupdate)

//Enviamos update
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewCustomers.updateNewCustomer>(`/Customers/Customers/AppLimena`, "",dataupdate);
  
//console.log(response)

    
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

  // const newItems = record?.items
  //   ? record.items.map((item) => ({
  //       ...item,
  //     }))
  //   : invoiceItems;

 if(record){

   return (
    <>
    <Form<IModel_NewCustomers.INewCustomer>
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
                <Input
                  label="Name"
                  
                  placeholder="Enter store name"
                  {...register('customerName')}
                  //error={errors.customerName?.message}
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
                  //error={errors.storeEmail?.message}
                />
                <Input
                  label="Website url"
                  
                  placeholder="Enter the url of the website store"
                  {...register('siteWeb')}
                  //error={errors.siteWeb?.message}
                />

              <Input
                  label="Unified Federal Tax ID"
                  placeholder="Enter the Federal Tax ID"
                  {...register('federalTax')}
                  //error={errors.federalTax?.message}
                />
                <Input
                  label="Resales Tax Certificate Number"
                  placeholder="Enter the Resales Tax Certificate Number"
                  {...register('resalesTaxCertificate')}
                 // error={errors.resalesTaxCertificate?.message}
                />
                <div>
                 <UploadZone
                label="Unified Federal Tax ID File"
                    propertyname='federalTaxImgeUrl'
                  name="images"
                  getValues={getValues}
                  setValue={setValue}
                /> 
                    <label>Unified Federal Tax ID File File</label><br></br>
                {record.federalTaxImgeUrl.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record.federalTaxImgeUrl} >
                  Show file
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}
     
   

                <div className='mt-4'>

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
                </div>

            
             

                

<div>
  
<UploadZone
                  propertyname='resalesTaxCertificateImageUrl'
                  label="Resales Tax Certificate Number File"
                  name="images2"
                  getValues={getValues}
                  setValue={setValue} 
                /> 
                <label>Resales Tax Certificate Number File</label><br></br>
                      {record.resalesTaxCertificateImageUrl.includes("http") ? <> 
                <Button color='primary' className="w-full @xl:w-auto mt-4">
                          <Link target='_blank'  href={record.resalesTaxCertificateImageUrl} >
                  Show file
              </Link>
              <PiDownloadLight strokeWidth="2" className="h-4 w-4 ml-2" />

              </Button>
                </> : null}

                
     
</div>
                  
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
                 // error={errors.street?.message}
                />
                <Input
                  label="City"
                  className='mt-4'
                  placeholder="Enter the City"
                  {...register('city')}
                  //error={errors.city?.message}
                />
                 
                 <Input
                  label="Zip Code"
                  placeholder="Enter the Zip code"
                  {...register('zipCode')}
                 // error={errors.zipCode?.message}
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
              //error={errors?.state?.message as string}
            />
          )}
        />
              </FormBlockWrapper>
             

              <AddContactsItems
                watch={watch}
                control={control}
                register={register}
                //errors={errors}
              />


<FormBlockWrapper
                title="Additional information"
                description=""
                
              >
          <label className='mt-4'>Operation time</label>          
<div className='mt-4'>
 

          <TimeRangePicker clearIcon={null}  disableClock={true} 
          onChange={onChangeTimerange} 
          value={timerangevalue}  />
        
        
</div>
           

                        
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
              //error={errors?.state?.message as string}
            />
          )}
        />

{/* <Controller
          control={control}
          name="priceList"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Price List"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value.toString()}
              onChange={onChange}
              options={pricelistvalues}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                pricelistvalues?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />
          )}
        /> */}
<label>Receiving Days</label>
<CheckboxGroup
            values={receivingdaysvaluesToSend}
            setValues={setReceivingDaysValuesToSend}
            className="col-span-full grid gap-4 @lg:grid-cols-4 mt-4"
          >
             
               {weekdays.map((service) => (
              <Checkbox
                  key={service.value}
                  name="prop_weekdays"
                  label={service.label}
                  value={service.value}
                  className="mb-5"
                  labelClassName="pl-2 text-sm font-medium !text-gray-900"
                  helperClassName="text-gray-500 text-sm mt-3 ms-8"
                />
              ))}
            
 
          </CheckboxGroup>

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


                 {/* <Controller
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
        /> */}
       


    
      
       
              </FormBlockWrapper>

              <FormBlockWrapper
                title="Services"
                description=""
                
              >
                
  
                   <CheckboxGroup
                   values={propertiesvaluesToSend}
                   setValues={setPropertiesValuesToSend}
                   className="col-span-full grid gap-4 @lg:grid-cols-3 mt-4"
                 >
                      {properties_services?.map((service) => (
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
                description="">
          <CheckboxGroup
            values={propertiesvaluesToSend}
            setValues={setPropertiesValuesToSend}
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
      <Button onClick={onSendtoCommercial}  className="w-full @xl:w-auto">
        Send to Commercial
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
