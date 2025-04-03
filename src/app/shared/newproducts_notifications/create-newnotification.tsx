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
  statusProducts
} from '@/app/shared/newcustomers/select-options';

import GeneralErrorCard from '@/components/cards/general-error-card';

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { customerStatus } from '../logistics/customer-profile/edit-profile/data';
//SESSION
import { useSession } from "next-auth/react"

type ValuePiece = Date | string | string[] | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const notificationItem = [
  { customerStatus: 0, email: '', isUser: false, tokenFcm: '', job:'', name:'' },
];



export default function CreateNotification() {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false); 

  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);

  const { push } = useRouter();
  //session
  const { data:session } = useSession()


  useEffect(() => {
    // action on update of movies
   
}, [errormessage]);

const onCancel = () => {
  //routes.newcustomers.home
} 


  const onSubmit: SubmitHandler<IModel_NewCustomers.INotificationPost> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);
   


    const dataupdate ={
      itemStatus: data.customerStatus,
      email: data.email,
      isUser:true,
      tokenFcm:"",
      job: data.job,
      name:data.name
    }

    console.log(JSON.stringify(dataupdate))

//Enviamos update
const response = await http.service().push<IModel_Errorgateway.IResponseAPI_notifications, IModel_NewCustomers.INotificationPost>(`/items/v2/Notifications`,session?.user.access_token.user.token, dataupdate);
  
//console.log(response)

    
    setTimeout(() => {
      setLoading(false);

if(response.succeeded){
        console.log('JSON FINAL data ->', JSON.stringify(dataupdate));

  toast.success(
    <Text as="b">Notification successfully created</Text>
  );
  push(routes.newproducts_notifications.home);

}else{
  const final : any=response;
  const errorResp=final as IModel_Errorgateway.IError_gateway;
  setErrorMessage(errorResp.response)
  console.log("Complete error log",errorResp)
  toast.error(
    <Text as="b">Error when create notification, please check log at bottom page or contact IT Support</Text>
  );
  setShowError(false);
}



    }, 600);
  };

   return (
    <>
    <Form<IModel_NewCustomers.INotificationPost>
      //validationSchema={newcustomerFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          customerStatus: 0,
          email:"",
          name:"",
          job:"",
          isUser:true,
          tokenFcm:"",
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
                  
                  placeholder="Enter name"
                  {...register('name')}
                  //error={errors.customerName?.message}
                />
            <Input
                  label="Position"
                  
                  placeholder="Enter position"
                  {...register('job')}
                  //error={errors.customerName?.message}
                />
 
                  <Input
                  label="Email"
                  placeholder="Enter the email"
                  {...register('email')}
                  //error={errors.storeEmail?.message}
                />
                             <Controller
          control={control}
          name="customerStatus"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Product status"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={statusProducts}
              getOptionValue={(option) => option.value}
              displayValue={(selected: number) =>
                statusProducts?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              //error={errors?.state?.message as string}
            />
          )}
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

      <Link  href={routes.newproducts_notifications.home} >
          Back to list
      </Link>

      <Button
        variant="solid"
        color="secondary"
        className="w-full @xl:w-auto"
        type="submit"
        isLoading={isLoading}
      >
        Create
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


  
}
