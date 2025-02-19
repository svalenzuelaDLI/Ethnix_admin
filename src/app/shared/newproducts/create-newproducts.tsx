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
  uoms,
  uomsGroup,
  vendors,
  storagetype
}: {
  id: string;
  record?: IModel_NewProducts.INewProduct;
  brands: {value:string, label:string}[] | undefined;
  uoms: {value:string, label:string}[] | undefined;
  uomsGroup: {value:string, label:string}[] | undefined;
  years: {value:string, label:string}[] | undefined;
  subcategories: {value:string, label:string, categoryId:string}[] | undefined;
  vendors: {value:string, label:string}[] | undefined;
  storagetype: {value:string, label:string}[] | undefined;

}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false); 


  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  const [showerror, setShowError] = useState(true);

  const [ItemCodeAuto, setItemCodeAuto] = useState("");
  const [descriptionAuto, setDescriptionAuto] = useState("");
  const [nameAuto, setNameAuto] = useState("");
  const [brandAuto, setBrandAuto] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [subcategoryValue, setSubCategoryValue] = useState("");
  const [subcategoryAuto, setSubCategoryAuto] = useState("");
  const [unitbarcodeAuto, setUnitBarcodeAuto] = useState("");
  const [propertiesvaluesToSend, setPropertiesValuesToSend] = useState([]);

  const [CIFUnitvalue, setCIFUnitValue] = useState(0);
  const [SuggestedMRGValue, setSuggestedMRGValue] = useState(0);
  const [SuggestedMainListPriceValue, setSuggestedMainListPriceValue] = useState(0);
  const [MainListPriceValue, setMainListPriceValue] = useState(0);
  const [SRPValue, setSRPValue] = useState(0);
  const [MRGValue, setMRGValue] = useState(0);

  const [TiValue, setTiValue] = useState(0);
  const [HiValue, setHiValue] = useState(0);
  const [casePalletsValue, setcasePalletsValue] = useState(0);


  const { push } = useRouter();


  useEffect(() => {
    // action on update of movies
   
}, [errormessage, descriptionAuto,ItemCodeAuto]);

const onCancel = () => {
  //routes.newcustomers.home
} 
const delay = ms => new Promise(res => setTimeout(res, ms));



const onSendtoSales=  async () => {

  alert("Enviando a marketing..")
  push(routes.newproducts.edit_marketing("00000"));



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
      
      //let ethnias: IModel_NewCustomers.ISchedulersUpdate[] = [];
      let propertiesUpload=[];
      //ETHNIAS
      //Buscamos en el array de servicios y devolvemos la data de los seleccionados en los checkboxx
      const propertiesEthniasSelected =  properties_ethnias.filter((el) => {
        return propertiesvaluesToSend.some((f) => {
          return f === el.code;
        });
      });
      //Recorremos los seleccionados y damos formato de PUT Properties
      propertiesEthniasSelected.map(property => {
        const newproperty={
          code: parseInt(property.code),
          name: property.name,
          deleted: false,
        }
        propertiesUpload?.push(newproperty); //Hacemos un solo array
      });

      const datacreate ={
        sapCode: ItemCodeAuto,
        description: descriptionAuto,
        subCategory: parseInt(subcategoryValue),
        barcodeEach: unitbarcodeAuto,
        barCodeCase:  "", //ya no se utilizara
        uoMGroup: parseInt(data.uoMGroup),
        brand: brandValue,
        productName: nameAuto,
        estimatedArrival: data.estimatedArrival,
        developmentYear: parseInt(data.developmentYear),
        vendor: data.vendor,
        vendorItemCode: data.vendorItemCode,
        purchasingUomCode: parseInt(data.purchasingUomCode),
        fobCase: parseFloat(data.fobCase),
        fobUnit: parseFloat(data.fobUnit),
        leadTime: parseInt(data.leadTime),
        suggestedMrg: SuggestedMRGValue,
        suggestedMainListPrice: SuggestedMainListPriceValue,
        suggestedSrp: SRPValue,
        mainListPrice: MainListPriceValue,
        margin: MRGValue,
        unitWeight: 0,
        caseWeight: 0,
        shelfLifeDay: parseInt(data.shelfLifeDay),
        hi: HiValue,
        ti: TiValue,
        casePerPallets: casePalletsValue,
        userId: "Services",
        //ultimos agregados/actualizados
        cifSmyrnaCase:  parseFloat(data.cifSmyrnaCase),
        cifSmyrnaUnit: CIFUnitvalue,
        sendToMarketing: false,  
        storageType: data.storageType,

        properties:propertiesUpload,

        minDaysReceipt: data.minDaysReceipt,
        minDaysDispatch: data.minDaysDispatch,
        urlImage: "",
        imageStatus: 1,
        myProperty: "",

      }
  
      console.log("Data to send->", datacreate)
      console.log('JSON FINAL data ->', JSON.stringify(datacreate));

  
  //Enviamos update
  const response = await http.service().push<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.INewProduct>(`/items/items/AppLimena`,"", datacreate);
  //console.log(response)
  
      
      setTimeout(() => {
        setLoading(false);
  
  if(response.succeeded){
  
    toast.success(
      <Text as="b">Product successfully created</Text>
    );
    push(routes.newproducts.home);
  
  }else{
    const final : any=response;
    const errorResp=final as IModel_Errorgateway.IError_gateway;
    setErrorMessage(errorResp.response)
    console.log("Complete error log",errorResp)
    toast.error(
      <Text as="b">Error when creating product, please check log at bottom page or contact IT Support</Text>
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
              value={brandValue}
              onChange={(selected: string) =>{
                setBrandValue(selected);
                var brandname= brands?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
                setBrandAuto(brandname)
                setDescriptionAuto(brandname + " " + nameAuto)

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
                  onChange={ (item) =>{
                    setNameAuto(item.target.value)
                    setDescriptionAuto(brandAuto + " " + item.target.value.toLocaleUpperCase())
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
          name="subCategory"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Subcategory"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={subcategoryValue}
              onChange={(selected: string) =>{
                console.log(selected)
                setSubCategoryValue(selected);
                var subcatnameID= subcategories?.find((c) => c.value === selected)?.categoryId.toLocaleUpperCase()
                console.log(subcatnameID)
                setSubCategoryAuto(subcatnameID)
                setItemCodeAuto(subcatnameID + unitbarcodeAuto)

              }}
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
                  maxLength={14}
                  value={unitbarcodeAuto}
                  placeholder=""
                  onChange={ (item) =>{
                    if (!isNaN(Number(item.target.value))) {
                      setUnitBarcodeAuto(item.target.value);
                      if(item.target.value.toString().length==14){
                        setItemCodeAuto(subcategoryAuto + item.target.value.toString().substring(7,13))
                        setUnitBarcodeAuto(item.target.value)
  
                      }else{
                        setItemCodeAuto(subcategoryAuto)
  
                      }
                  }
                 
                  }}
                  //{...register('barcode')}
                />
             <Input
                  label="ITEM CODE RESULT"
                  readOnly
                  value={ItemCodeAuto}
                  placeholder="(Subcategory + Last 6 digitas unit barcode)"
                  {...register('sapCode')}
                />
           



         
<Controller
          control={control}
          name="uoMGroup"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Unit of Measure Group"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              searchable={true}
              value={value}
              onChange={onChange}
              options={uomsGroup}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                uomsGroup?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />

<Input
                  label="Arrival Date"
                  type={"date"}
                  placeholder=""
                  {...register('estimatedArrival')}
                />
    <Controller
          control={control}
          name="developmentYear"
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
                 
   <UploadZone
                label="Product image"
                    propertyname='productImage'
                  name="productImage"
                  getValues={getValues}
                  setValue={setValue}
                />
            
             

                

<div>
  

                
     
</div>
                  
              </FormBlockWrapper>
              <FormBlockWrapper
                title="Purchase"
                description=""
                
              >
             <Controller
          control={control}
          name="vendor"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Vendor"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
              value={value}
              onChange={onChange}
              options={vendors}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                vendors?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />

                  <Input
                className='mt-4'
                  label="Vendor's ItemCode"
                  placeholder=""
                  {...register('vendorItemCode')}
                />
           <Controller
          control={control}
          name="purchasingUomCode"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Purchasing UoM"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
                className=''
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
                  {...register('fobCase')}
                />
        
        <Input
                  label="FOB UNIT ($)"
                  type={"number"}
                  placeholder=""
                  {...register('fobUnit')}
                />

<Input
                  label="CIF SMYRNA CASE ($)"
                  type={"number"}
                  placeholder=""
                  {...register('cifSmyrnaCase')}
                />
                <Input
                  label="CIF SMYRNA UNIT ($)"
                  type={"number"}
                  placeholder=""
                  value={CIFUnitvalue}
                  onChange={ (item) =>{
                    setCIFUnitValue(parseFloat(item.target.value))
                  }}

                />
                  <Input
                  label="Lead time (Days)"
                  type={"number"}
                  placeholder=""
                  {...register('leadTime')}
                />

              </FormBlockWrapper>
             
              <FormBlockWrapper
                title="Sales"
                description=""
                
              >
                <Input
                className='mt-4'
                  label="Suggested MRG %"
                  value={SuggestedMRGValue}
                  type={"number"}
                  onChange={ (item) =>{
                    setSuggestedMRGValue(parseFloat(item.target.value))
                    //calculamos el suggested main list price
                    //Costo CIF/(1-Porcentaje de margen)

                    const suggestedmainlistpriceCALC=CIFUnitvalue/(1-(parseFloat(item.target.value)/100));
                    console.log("SUGGESTED MAIN LIST PRICE",suggestedmainlistpriceCALC)
                   setSuggestedMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(2)))
                   setMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(2)))

                        //Calculamos SRP
                    //SUGGESTED MAIN LIST PRICE *1.4
                    const SRPCALC=suggestedmainlistpriceCALC*1.4;
                    console.log("SRP",SRPCALC)
                    //Hacemos calculos de aproximacion decimales
                   setSRPValue(parseFloat(SRPCALC.toFixed(2)))
                 
                     //calculamos margen
                    //(Precio Item List (main list price calculated) - Costo CIF)/Precio Item list
                    const MRGCALC = ((suggestedmainlistpriceCALC - CIFUnitvalue)/suggestedmainlistpriceCALC) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(2)))

                  }}
                />
                 <Input
                                 className='mt-4'

                  label="Suggested main list price ($)"
                  value={SuggestedMainListPriceValue}
                  readOnly
                />
           <Input
                className=''
                  label="Main list price calculated ($)"
                  value={MainListPriceValue}
                  type={"number"}
                  onChange={ (item) =>{
                    //Si cambia este valor, volvemos a calcular
                    setMainListPriceValue(parseFloat(item.target.value))

                        //Calculamos SRP
                    //SUGGESTED MAIN LIST PRICE *1.4
                    const SRPCALC= parseFloat(item.target.value)*1.4;
                    console.log("SRP",SRPCALC)
                    //Hacemos calculos de aproximacion decimales
                   setSRPValue(parseFloat(SRPCALC.toFixed(2)))

                    //calculamos margen
                    //(Precio Item List (main list price calculated) - Costo CIF)/Precio Item list
                    const MRGCALC = ((parseFloat(item.target.value) - CIFUnitvalue)/parseFloat(item.target.value)) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(2)))
                  }}
                />
                 
                
        
        <Input
                  label="MRG Calculated(%)"
                  placeholder=""
                  readOnly
                  value={MRGValue}
                />

<Input
                  label="SRP ($)"
                  value={SRPValue}
                  readOnly
                />
               
               <CheckboxGroup
            values={propertiesvaluesToSend}
            setValues={setPropertiesValuesToSend}
            className="col-span-full grid gap-4 @lg:grid-cols-3 mt-4"
          >
            
            <h3>Ethnias</h3>

         
           
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
              <FormBlockWrapper
                title="Inventory"
                description=""
                
              >
                <Input
                className='mt-4'
                  label="Min days receipt"
                  type={"number"}
                  {...register('minDaysReceipt')}

                   />
                 <Input
                                 className='mt-4'

                  label="Shelf life days"
                  type={"number"}
                  placeholder=""
                  {...register('shelfLifeDay')}
                />
           <Input
                className=''
                  label="TI"
                  type={'number'}
                  value={TiValue}
                  onChange={ (item) =>{
                    //Si cambia este valor, volvemos a calcular
                    setTiValue(parseFloat(item.target.value))
                    //Calculamos Case per pallets
                    //TIxHI
                    const casexpallets= parseFloat(item.target.value)*HiValue;
                    //Hacemos calculos de aproximacion decimales
                    setcasePalletsValue(parseFloat(casexpallets.toFixed(0)))
                  }}
                />
                
        <Input
                  label="HI"
                  type={"number"}
                  value={HiValue}
                  onChange={ (item) =>{
                    //Si cambia este valor, volvemos a calcular
                    setHiValue(parseFloat(item.target.value))
                    //Calculamos Case per pallets
                    //TIxHI
                    const casexpallets= parseFloat(item.target.value)*TiValue;
                    //Hacemos calculos de aproximacion decimales
                    setcasePalletsValue(parseFloat(casexpallets.toFixed(0)))
                  }}
                />

<Input
                  label="Case per pallets"
                  type={"number"}
                  readOnly
                  value={casePalletsValue}
                />
               
               <Input
                  label="Min days dispatch"
                  type={"number"}
                  {...register('minDaysDispatch')}                />

<Controller
          control={control}
          name="storageType"
          render={({ field: { value, onChange } }) => (
            <Select
              label="BIN Location"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid !z-10"
              inPortal={false}
                className=''
              value={value}
              onChange={onChange}
              options={storagetype}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                storagetype?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
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

      <Link  href={routes.newproducts.home} >
          Back to list
      </Link>

      <Button
        variant="solid"
        color="secondary"
        className="w-full @xl:w-auto"
        type="submit"
        isLoading={isLoading}
      >
        Create product
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
