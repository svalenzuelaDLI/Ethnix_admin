'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text, Input, Select,RadioGroup,AdvancedRadio, Button ,CheckboxGroup, Checkbox} from 'rizzui';
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
  yesnoanswer, weekdaysnumbers, visitfrecuency, properties_ethniasITEMS
} from '@/app/shared/newcustomers/select-options';
//ERROR
import GeneralErrorCard from '@/components/cards/general-error-card';
import { parseInt, values } from 'lodash';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { year } from 'date-arithmetic';
import UploadZone from '@/components/ui/file-upload/newcustomers-upload';

import { z } from 'zod';

const productSchema = z.object({
  barcodeEach: z.string().min(12, { message: 'Ingrese minimo 12 caracteres' }),
  sapCode: z.string().min(9, { message: 'Minimo de caracteres para generar: 9' }),
  //salesDefaultUomCode:   z.number().min(1,{ message: "Campo obligatorio" }),
  //purchasingUomCode:  z.number().min(1,{ message: "Campo obligatorio" }),
  developmentYear: z.number(),
  estimatedArrival: z.string(),
  fobCase: z.number(),
  fobUnit: z.number(),
  leadTime: z.number(),
  shelfLifeDay: z.number(),
  cifSmyrnaCase: z.number(),
  //storageType: z.string(),
  minDaysReceipt: z.number(),
  minDaysDispatch: z.number(),
  vendorItemCode:z.string(),
  vendor: z.string(),
});

export default function EditNewProductsPurchasing({
  id,
  record,
  years,
  internalcategories,
  subcategories,
  brands,
  uoms,
  uomsGroup,
  vendors,
  storagetype,
  propertiesvalues,
  ethnicities,
}: {
  id: string;
  record?: IModel_NewProducts.IProductUpdate | IModel_NewProducts.IProductUpdate | undefined;
  years: {value:string, label:string}[] | undefined;
  internalcategories: {value:string, label:string}[] | undefined;
  brands: {value:string, label:string}[] | undefined;
  uoms: {value:string, label:string}[] | undefined;
  uomsGroup: {value:string, label:string, uoms:[]}[] | undefined;
  subcategories: {value:string, label:string, categoryId:string}[] | undefined;
  vendors: {value:string, label:string}[] | undefined;
  storagetype: {value:string, label:string}[] | undefined;
  propertiesvalues: string[];
  ethnicities: {value:string, label:string}[] | undefined;

}) {
  const [isLoading, setLoading] = useState(false); 
  const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';
  //Errors
  const [errormessage, setErrorMessage] = useState<IModel_Errorgateway.IResponse>();
  //Selects
  const [showerror, setShowError] = useState(true);
  const [categoryValue, setCategoryValue] = useState("");


  const [ItemCodeAuto, setItemCodeAuto] = useState(record?.sapCode);
  const [descriptionAuto, setDescriptionAuto] = useState(record?.description);
  const [nameAuto, setNameAuto] = useState(record?.productName);
  const [VendorCode, setVendorCode] = useState(record?.vendorItemCode);

  const [brandAuto, setBrandAuto] = useState("");
  const [brandValue, setBrandValue] = useState(record?.brand.toString());
  const [subcategoryValue, setSubCategoryValue] = useState(record?.subCategory.toString());
  const [subcategoryAuto, setSubCategoryAuto] = useState("");
  const [unitbarcodeAuto, setUnitBarcodeAuto] = useState(record?.barcodeEach);
  const [propertiesvaluesToSend, setPropertiesValuesToSend] = useState(propertiesvalues);

  const [CIFUnitvalue, setCIFUnitValue] = useState(record?.cifSmyrnaUnit);
  const [SuggestedMRGValue, setSuggestedMRGValue] = useState(record?.suggestedMrg);
  const [SuggestedMainListPriceValue, setSuggestedMainListPriceValue] = useState(record?.suggestedMainListPrice);
  const [MainListPriceValue, setMainListPriceValue] = useState(record?.mainListPrice);
  const [SRPValue, setSRPValue] = useState(record?.suggestedSrp);
  const [MRGValue, setMRGValue] = useState(record?.margin);

  const [TiValue, setTiValue] = useState(record?.ti);
  const [HiValue, setHiValue] = useState(record?.hi);
  const [casePalletsValue, setcasePalletsValue] = useState(record?.casePerPallets);
  const [uomGroupValue, setuomGroupValue] = useState(record?.uoMGroup.toString());
  const [uomsSubGroup, setUomsSubGroup] = useState<{value: string, label:string}[]>([]);
  const [uomsSubGroupValue, setUomsSubGroupValue] = useState(record?.purchasingUomCode);
  const [uomsSalesSubGroupValue, setUomsSalesSubGroupValue] = useState(record?.salesDefaultUomCode);

  const [sendtomark, setSendtomark] = useState(false);

  const [purchasingUomCodeValue, setpurchasingUomCodeValue] = useState(record?.purchasingUomCode.toString());


  const { push } = useRouter();

  useEffect(() => {
    // action on update of movies
    if(record){
      if(uomsGroup){
        console.log("OBJETO EXTRA", uomsGroup)

        var objUom= uomsGroup?.find((c) => c.value === record.uoMGroup.toString())
        console.log("OBJETO EXTRA", objUom)
        let objitem=[];
        objUom.uoms.map(item=>{
          const itemadd={value: item.uomEntry, label:item.uomName}
          objitem.push(itemadd)
        })
        setUomsSubGroup(objitem)
      }
   

    }

  
   
}, [errormessage, descriptionAuto,ItemCodeAuto, brandValue]);




  const onSubmit: SubmitHandler<IModel_NewProducts.IProductUpdate> = async (data) => {
    const http = new HttpService();
    setLoading(true);
    setShowError(true);
    
    console.log("antes de enviar",record.properties)
    //let ethnias: IModel_NewCustomers.ISchedulersUpdate[] = [];
    //Properties originales a eliminar
    let propertiesUpload = [];
    
    record?.properties.map(property => {
      const newproperty={
        PropertyId: property.id,
        code: parseInt(property.propertyNum),
        name: property.propertyName,
        deleted:true
      }
      propertiesUpload?.push(newproperty); //Hacemos un solo array

   
    });
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
        PropertyId: 0,
        code: parseInt(property.value),
        name: property.label,
        deleted:false
      }
      propertiesUpload?.push(newproperty); //Hacemos un solo array
    });
    console.log("def",data)

    const datacreate ={
      itemId: id,
      sapCode: ItemCodeAuto,
      description: descriptionAuto,
      subCategory: parseInt(subcategoryValue),
      barcodeEach: unitbarcodeAuto,
      barCodeCase:  "", //ya no se utilizara
      uoMGroup: parseInt(uomGroupValue),
      salesDefaultUomCode: parseInt(purchasingUomCodeValue),
      brand: brandValue,
      productName: nameAuto,
      estimatedArrival: data.estimatedArrival,
      developmentYear: parseInt(data.developmentYear),
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
      sendNotification: sendtomark,
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
const response = await http.service().update<IModel_Errorgateway.IResponseAPI, IModel_NewProducts.IProductUpdate>(`/items/v2/items/AppLimena/Purchasing`,"", datacreate);
//console.log(response)

    
    setTimeout(() => {
      setLoading(false);

if(response.succeeded){

  toast.success(
    <Text as="b">Product successfully updated</Text>
  );

  if(sendtomark){
    push(routes.newproducts.home);

  }
}else{
  const final : any=response;
  const errorResp=final as IModel_Errorgateway.IError_gateway;
  setErrorMessage(errorResp.response)
  console.log("Complete error log",errorResp)
  toast.error(
    <Text as="b">Error when updating product, please check log at bottom page or contact IT Support</Text>
  );
  setShowError(false);
}



    }, 600);
  };


 if(record){

   return (
    <>
    <Form<IModel_NewProducts.IProductUpdate>
      validationSchema={productSchema}
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
              inPortal={false}
              value={brandValue}
              searchable={true}
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
                  value={nameAuto}
                  style={{textTransform:"uppercase"}}
                  placeholder="Enter product's name"
                  onChange={ (item) =>{
                    setNameAuto(item.target.value.toLocaleUpperCase())
                    setDescriptionAuto(brandAuto + " " + item.target.value.toLocaleUpperCase())
                  }}
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
              labelClassName="text-gray-900"
              inPortal={false}
                            searchable={true}

              value={subcategoryValue}
              onChange={(selected: string) =>{
                console.log(selected)
                setSubCategoryValue(selected);
                var subcatnameID= subcategories?.find((c) => c.value === selected)?.categoryId.toLocaleUpperCase()
                //console.log(subcatnameID)
                setSubCategoryAuto(subcatnameID)


             
                  if(unitbarcodeAuto.length>11){
                    setItemCodeAuto(subcatnameID + unitbarcodeAuto.toString().substring(unitbarcodeAuto.toString().length-6))
                    setValue("sapCode",subcatnameID + unitbarcodeAuto.toString().substring(unitbarcodeAuto.toString().length-6) )

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
                    onChange: (item) => {
                      if (!isNaN(Number(item.target.value))) {
                        setUnitBarcodeAuto(item.target.value);
                        if(item.target.value.toString().length>11){
                          setItemCodeAuto(subcategoryAuto + item.target.value.toString().substring(item.target.value.toString().length-6))
                          setValue("sapCode",subcategoryAuto + item.target.value.toString().substring(item.target.value.toString().length-6) )

                          setUnitBarcodeAuto(item.target.value)
    
                        }else{
                          setItemCodeAuto(subcategoryAuto)
    
                        }
                    }
                    },
                    //onBlur: (e) => {},
                  })}
                  // onChange={ (item) =>{
                 
                 
                  // }}
                />
             <Input
                  label="ITEM CODE RESULT"
                  readOnly
                  value={ItemCodeAuto}
                  error={errors.sapCode?.message}
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  placeholder="(Subcategory + Last 6 digits unit barcode)"
                  {...register('sapCode')}
                />
           



         
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
                  label={"Arrival Date (" + record?.estimatedArrival + ")"} 
                  
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
              label="Vendor"
              {...register('vendor')}
              error={errors.vendor?.message}
              labelClassName="text-gray-900"
              inPortal={false}
                            searchable={true}

              value={value}
                  className='mt-4'
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
                                    value={VendorCode}
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
              value={uomsSubGroupValue}
              onChange={e => {
 
                setUomsSubGroupValue(e)
       

							}}
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
                   setSuggestedMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(3)))
                   setMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(3)))

                        //Calculamos SRP
                    //SUGGESTED MAIN LIST PRICE *1.4
                    const SRPCALC=suggestedmainlistpriceCALC*1.4;
                    console.log("SRP",SRPCALC)
                    //Hacemos calculos de aproximacion decimales
                   setSRPValue(parseFloat(SRPCALC.toFixed(3)))
                 
                     //calculamos margen
                    //(Precio Item List (main list price calculated) - Costo CIF)/Precio Item list
                    const MRGCALC = ((suggestedmainlistpriceCALC - parseFloat(item.target.value))/suggestedmainlistpriceCALC) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(3)))

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
                   setSuggestedMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(3)))
                   setMainListPriceValue(parseFloat(suggestedmainlistpriceCALC.toFixed(3)))

                        //Calculamos SRP
                    //SUGGESTED MAIN LIST PRICE *1.4
                    const SRPCALC=suggestedmainlistpriceCALC*1.4;
                    console.log("SRP",SRPCALC)
                    //Hacemos calculos de aproximacion decimales
                   setSRPValue(parseFloat(SRPCALC.toFixed(3)))
                 
                     //calculamos margen
                    //(Precio Item List (main list price calculated) - Costo CIF)/Precio Item list
                    const MRGCALC = ((suggestedmainlistpriceCALC - CIFUnitvalue)/suggestedmainlistpriceCALC) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(3)))

                  }}

                />
                 <Input
                                 className='mt-4'

                  label="Suggested main list price ($)"
                  value={SuggestedMainListPriceValue}
                  readOnly
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  {...register('suggestedMainListPrice')}

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
                   setSRPValue(parseFloat(SRPCALC.toFixed(3)))

                    //calculamos margen
                    //(Precio Item List (main list price calculated) - Costo CIF)/Precio Item list
                    const MRGCALC = ((parseFloat(item.target.value) - CIFUnitvalue)/parseFloat(item.target.value)) *100
                    setMRGValue(parseFloat(MRGCALC.toFixed(3)))
                  }}

                />
                 
                
        
        <Input
                  label="MRG Calculated(%)"
                  placeholder=""
                  className='mt-4'

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
                value={purchasingUomCodeValue}
                onChange={e => {
   
                  setUomsSalesSubGroupValue(e)
         
  
                }}
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
              label="Storage Type"
              error={errors.storageType?.message}
              {...register('storageType')}
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
                  value={casePalletsValue}
                  style={{backgroundColor: '#ededed',opacity:0.75,pointerEvents: 'none'}}

                  {...register('casePerPallets')}

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

 
<div style={{marginBottom:100}}></div>
      
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
        Save
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
}
