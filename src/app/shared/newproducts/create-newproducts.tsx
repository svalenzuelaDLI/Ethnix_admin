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
  states,yesnoanswer, properties_services, properties_ethniasITEMS, weekdays,properties_extra
} from '@/app/shared/newcustomers/select-options';

import GeneralErrorCard from '@/components/cards/general-error-card';

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { z } from 'zod';

const productSchema = z.object({
  barcodeEach: z.string().min(12, { message: 'Ingrese minimo 12 caracteres' }),
  sapCode: z.string().min(9, { message: 'Minimo de caracteres para generar: 9' }),
  //salesDefaultUomCode:   z.number().min(1,{ message: "Campo obligatorio" }),
  //purchasingUomCode:  z.number().min(1,{ message: "Campo obligatorio" }),
  developmentYear: z.string().min(1,{ message: "Campo obligatorio" }),
  estimatedArrival: z.string().min(1,{ message: "Campo obligatorio" }),
  fobCase: z.string().min(1,{ message: "Campo obligatorio" }),
  fobUnit: z.string().min(1,{ message: "Campo obligatorio" }),
  leadTime: z.string().min(1,{ message: "Campo obligatorio" }),
  shelfLifeDay: z.string().min(1,{ message: "Campo obligatorio" }),
  cifSmyrnaCase: z.string().min(1,{ message: "Campo obligatorio" }),
  //storageType: z.string().min(1,{ message: "Campo obligatorio" }),
  minDaysReceipt: z.string().min(1,{ message: "Campo obligatorio" }),
  minDaysDispatch: z.string().min(1,{ message: "Campo obligatorio" }),
  vendorItemCode:z.string().min(1,{ message: "Campo obligatorio" }),
  vendor: z.string().min(1,{ message: "Campo obligatorio" }),
});

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
  storagetype,
  ethnicities
}: {
  id: string;
  record?: IModel_NewProducts.INewProduct;
  brands: {value:string, label:string}[] | undefined;
  uoms: {value:string, label:string}[] | undefined;
  uomsGroup: {value:string, label:string, uoms:[]}[] | undefined;
  years: {value:string, label:string}[] | undefined;
  subcategories: {value:string, label:string, categoryId:string}[] | undefined;
  vendors: {value:string, label:string}[] | undefined;
  storagetype: {value:string, label:string}[] | undefined;
  ethnicities:{value:string, label:string}[] | undefined;

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
    const [VendorCode, setVendorCode] = useState("");
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

  const [uomGroupValue, setuomGroupValue] = useState("");
  const [uomsSubGroup, setUomsSubGroup] = useState<{value: string, label:string}[]>([]);
  const [purchasingUomCodeValue, setpurchasingUomCodeValue] = useState("");
  const { push } = useRouter();
  const http = new HttpService();

  const [exitItemCode, setExistItemCode] = useState("");
  const [sendtomark, setSendtomark] = useState(false);

  useEffect(() => {
    // action on update of movies
   
}, [errormessage, descriptionAuto,ItemCodeAuto,uomsSubGroup ]);

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
    console.log("datos en data", data)

      const http = new HttpService();
      setLoading(true);
      setShowError(true);
      
      //let ethnias: IModel_NewCustomers.ISchedulersUpdate[] = [];
      let propertiesUpload=[];
      //ETHNIAS
      //Buscamos en el array de servicios y devolvemos la data de los seleccionados en los checkboxx
      const propertiesEthniasSelected =  ethnicities.filter((el) => {
        return propertiesvaluesToSend.some((f) => {
          return f === el.value;
        });
      });
      //Recorremos los seleccionados y damos formato de PUT Properties
      propertiesEthniasSelected.map(property => {
        const newproperty={
          code: parseInt(property.value),
          name: property.label,
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
        uoMGroup: parseInt(uomGroupValue),
        brand: brandValue,
        productName: nameAuto,
        estimatedArrival: data.estimatedArrival,
        developmentYear: parseInt(data.developmentYear),
              salesDefaultUomCode: parseInt(purchasingUomCodeValue),
        
        vendor: data.vendor,
        vendorItemCode: VendorCode,
        purchasingUomCode: parseInt(purchasingUomCodeValue),
        fobCase: parseFloat(data.fobCase),
        fobUnit: parseFloat(data.fobUnit),
        leadTime: parseInt(data.leadTime),
        suggestedMrg: SuggestedMRGValue,
        suggestedMainListPrice: SuggestedMainListPriceValue,
        suggestedSrp: SRPValue,
        mainListPrice: MainListPriceValue,
        margin: MRGValue,
        sendNotification:sendtomark,
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
        sendToMarketing: sendtomark,  
        storageType: '',//data.storageType,

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
  const response = await http.service().push<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.INewProduct>(`/items/v2/items/AppLimena`,"", datacreate);
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
      validationSchema={productSchema}
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
              searchable={true}

              labelClassName="text-gray-900"
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
                  style={{textTransform:"uppercase"}}
                  placeholder="Enter product's name"
                  onChange={ (item) =>{
                    setNameAuto(item.target.value.toLocaleUpperCase())
                    setDescriptionAuto(brandAuto + " " + item.target.value.toLocaleUpperCase())
                  }}
                  //{...register('productName')}
                />
                <Input
                  label="Description"
                  readOnly
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

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
              searchable={true}

              labelClassName="text-gray-900"
              inPortal={false}
              value={subcategoryValue}
              onChange={async (selected: string) =>{
                console.log(selected)
                setSubCategoryValue(selected);
                var subcatnameID= subcategories?.find((c) => c.value === selected)?.categoryId.toLocaleUpperCase()
                console.log(subcatnameID)
                setSubCategoryAuto(subcatnameID)
                if(unitbarcodeAuto.length>11){
                  setItemCodeAuto(subcatnameID + unitbarcodeAuto.toString().substring(unitbarcodeAuto.toString().length-6))
                  setValue("sapCode",subcatnameID + unitbarcodeAuto.toString().substring(unitbarcodeAuto.toString().length-6) )

                  const itemtemp=subcatnameID + unitbarcodeAuto.toString().substring(unitbarcodeAuto.toString().length-6)
                  //Validamos ITEMCODE
                  try{
                    const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/v2/items`,"",{ Filter: 'x.ItemCode="' + itemtemp + '"' });
                    console.log("PRODUCTO",response)
                    if (response?.data) {
                      if(response?.data.data){
                        setExistItemCode("ITEMCODE NO DISPONIBLE: " + response.data.data[0].largeDescription)
                      }else{
                        setExistItemCode("")
                      }

                    } else{
                      setExistItemCode("")
                    }
                  }catch{
                    setExistItemCode("")
                  }

                }else{
                  setItemCodeAuto(subcatnameID)

                }
            

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
                  maxLength={13}
                  value={unitbarcodeAuto}
                  placeholder=""
                  error={errors.barcodeEach?.message}
                  {...register('barcodeEach', {
                    onChange: async (item)  => {
                      if (!isNaN(Number(item.target.value))) {
                        setUnitBarcodeAuto(item.target.value);
                        if(item.target.value.toString().length>11){
                          setItemCodeAuto(subcategoryAuto + item.target.value.toString().substring(item.target.value.toString().length-6))
                          setValue("sapCode",subcategoryAuto + item.target.value.toString().substring(item.target.value.toString().length-6) )

                          setUnitBarcodeAuto(item.target.value)
    

                          const itemtemp=subcategoryAuto + item.target.value.toString().substring(item.target.value.toString().length-6)
                          //Validamos ITEMCODE
                          try{
                            const response = await http.service().get<IModel_NewProducts.IProduct>(`/items/v2/items`,"",{ Filter: 'x.ItemCode="' + itemtemp + '"' });
                            console.log("PRODUCTO",response)
                            if (response?.data) {
                              if(response?.data.data){
                                setExistItemCode("ITEMCODE NO DISPONIBLE: " + response.data.data[0].largeDescription)
                              }else{
                                setExistItemCode("")
                              }

                            } else{
                              setExistItemCode("")
                            }
                          }catch{
                            setExistItemCode("")
                          }
                        
                           

                        }else{
                          setItemCodeAuto(subcategoryAuto)
    
                        }
                    }
                    },
                    //onBlur: (e) => {},
                  })}
                  //{...register('barcode')}
                />
                <div>
                <Input
                  label="ITEM CODE RESULT"
                  readOnly
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  value={ItemCodeAuto}
                  error={errors.sapCode?.message}

                  placeholder="(Subcategory + Last 6 digits unit barcode)"
                  {...register('sapCode')}
                />
                <label style={{color:'red'}}>{exitItemCode}</label>

                </div>
       
           


         
<Controller
          control={control}
          name="uoMGroup"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Unit of Measure Group"
              labelClassName="text-gray-900"
              inPortal={false}
              searchable={true}
              value={uomGroupValue}
              onChange={e => {
                var objUom= uomsGroup?.find((c) => c.value === e)
                console.log(objUom)
                setuomGroupValue(e)
                let objitem=[];
                objUom.uoms.map(item=>{
                  const itemadd={value: item.uomEntry, label:item.uomName}
                  objitem.push(itemadd)
                })
                setUomsSubGroup(objitem)

                if(objUom.value=="-1"){ //MANUAL
                  setpurchasingUomCodeValue("-1")
                }
                else if(objUom.value=="1"){ //EACH
                  setpurchasingUomCodeValue("1")

                }
                else if(objUom.value=="2"){ //LBS
                  setpurchasingUomCodeValue("2")

                }else{
                    //Ya no necesitamos listado asi que seleccionamos y filtramos por defecto
                    const casetype=objUom.uoms.filter(c=> c.uomName.includes("CASE"));
                    console.log(casetype)
                    if(casetype!=null){
                      if(casetype.length>0){
                        setpurchasingUomCodeValue(casetype[0].uomEntry.toString())
                      }else{
                        alert("No se encontro configuracion CASE, se asignara EACH para unidad de compra y venta")
                        setpurchasingUomCodeValue("1")
  
                      }
                    }else{
                      alert("No se encontro configuracion CASE, se asignara EACH para unidad de compra y venta")
                      setpurchasingUomCodeValue("1")

                    }
                }
               

							}}
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
                  error={errors.estimatedArrival?.message}

                />
    <Controller
          control={control}
          name="developmentYear"
          render={({ field: { value, onChange } }) => (
            <Select
            {...register('developmentYear')}
            error={errors.developmentYear?.message}
              label="Development year"
              labelClassName="text-gray-900"
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
                 
   {/* <UploadZone
                label="Product image"
                    propertyname='productImage'
                  name="productImage"
                  getValues={getValues}
                  setValue={setValue}
                /> */}
            
             

                

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
            {...register('vendor')}
            error={errors.vendor?.message}
              label="Vendor"
              searchable={true}

              labelClassName="text-gray-900 mt-4"
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
                  style={{textTransform:"uppercase"}}
                  placeholder=""
                  onChange={ (item) =>{
                    setVendorCode(item.target.value.toLocaleUpperCase())
                  }}
                  />
                 <div style={{display:'none'}}>
           <Controller
          control={control}
          name="purchasingUomCode"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Purchasing UoM"
              error={errors.purchasingUomCode?.message}
              {...register('purchasingUomCode')}

              searchable={true}
              labelClassName="text-gray-900"
              inPortal={false}
                className=''
              value={value}
              onChange={onChange}
              options={uomsSubGroup}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                uomsSubGroup?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
        />
              </div>   
                 <Input
                                 className='mt-4'

                  label="FOB CASE ($)"
                  type={"number"}
                  placeholder=""
                  {...register('fobCase')}
                  error={errors.fobCase?.message}

                />
        
        <Input
                        className='mt-4'

                  label="FOB UNIT ($)"
                  type={"number"}
                  placeholder=""
                  {...register('fobUnit')}
                  error={errors.fobUnit?.message}

                />

<Input
                  label="CIF SMYRNA CASE ($)"
                  type={"number"}
                  placeholder=""
                  {...register('cifSmyrnaCase')}
                  error={errors.cifSmyrnaCase?.message}

                />
                <Input
                  label="CIF SMYRNA UNIT ($)"
                  type={"number"}
                  placeholder=""
                  value={CIFUnitvalue}
                  onChange={ (item) =>{
                    setCIFUnitValue(parseFloat(item.target.value))
                    //calculamos el suggested main list price
                    //Costo CIF/(1-Porcentaje de margen)

                    const suggestedmainlistpriceCALC=parseFloat(item.target.value)/(1-(SuggestedMRGValue/100));
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
                    const MRGCALC = ((suggestedmainlistpriceCALC - parseFloat(item.target.value))/suggestedmainlistpriceCALC) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(2)))

                  }}

                />
                  <Input
                  label="Lead time (Days)"
                  type={"number"}
                  placeholder=""
                  {...register('leadTime')}
                  error={errors.leadTime?.message}

                  
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
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                />
           <Input
                                className='mt-4'

                  label="Main list price planning ($)"
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
                        className='mt-4'

                  label="MRG Calculated(%)"
                  placeholder=""
                  readOnly
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  value={MRGValue}
                />

<Input
                  label="SRP ($)"
                  value={SRPValue}
                  readOnly
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                />
                 <div style={{display:'none'}}>
                          <Controller
          control={control}
          name="salesDefaultUomCode"

          render={({ field: { value, onChange } }) => (
            <Select
            error={errors.salesDefaultUomCode?.message}
            {...register('salesDefaultUomCode')}

              label="Sales Default UoM"
              labelClassName="text-gray-900"
              inPortal={false}
                className=''
              value={value}
              onChange={onChange}
              options={uomsSubGroup}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                uomsSubGroup?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
            />
          )}
          />
              </div> 
               <CheckboxGroup
            values={propertiesvaluesToSend}
            setValues={setPropertiesValuesToSend}
            className="col-span-full grid gap-4 @lg:grid-cols-3 mt-4"
          >
            
            <h3>Ethnias</h3>

         <label></label>
           <label></label>
               {ethnicities.map((service) => (
              <Checkbox
                  key={service.value}
                  name="prop_ethnias"
                  label={service.label}
                  value={service.value}
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

{/* <Controller
          control={control}
          name="storageType"
          render={({ field: { value, onChange } }) => (
            <Select
            error={errors.storageType?.message}
            {...register('storageType')}
              label="Storage Type"
              searchable={true}

              labelClassName="text-gray-900 mt-4"
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
        /> */}
                <Input
                className='mt-4'
                  label="Min days receipt"
                  type={"number"}
                  {...register('minDaysReceipt')}
                  error={errors.minDaysReceipt?.message}

                   />
                 <Input
                className='mt-4'

                  label="Shelf life days"
                  type={"number"}
                  placeholder=""
                  {...register('shelfLifeDay')}
                  error={errors.shelfLifeDay?.message}

                />
           <Input
                                className='mt-4'

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
                
        <Input className='mt-4'
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
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  value={casePalletsValue}
                />
               
               <Input
                  label="Min days dispatch"
                  type={"number"}
                  {...register('minDaysDispatch')}               
error={errors.minDaysDispatch?.message} />

<Controller
          control={control}
          name="sendToMarketing"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Send to Marketing Area"
              labelClassName="text-gray-900"
              inPortal={false}
              value={sendtomark}
              onChange={(option) => setSendtomark(option)}
              options={yesnoanswer}
              getOptionValue={(option) => option.value}
              displayValue={(selected: boolean) =>
                yesnoanswer?.find((c) => c.value === selected)?.label.toLocaleUpperCase()
              }
              
              //error={errors?.state?.message as string}
            />
          )}
        />

        <label style={{marginBottom:100}}></label>
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
