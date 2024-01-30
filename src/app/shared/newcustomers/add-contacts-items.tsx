'use client';

import { Text, Button, Input, Textarea, ActionIcon } from 'rizzui';
import { useFieldArray, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { calculateTotalPrice } from '@/utils/calculate-total-price';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';

// quantity component for invoice
function QuantityInput({
  name,
  error,
  onChange,
  defaultValue,
}: {
  name?: string;
  error?: string;
  onChange?: (value: number) => void;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue ?? 1);

  function handleIncrement() {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleDecrement() {
    let newValue = value > 1 ? value - 1 : 1;
    setValue(newValue);
    onChange && onChange(newValue);
  }

  function handleOnChange(inputValue: number) {
    setValue(Number(inputValue));
    onChange && onChange(inputValue);
  }

  useEffect(() => {
    setValue(defaultValue ?? 1);
    onChange && onChange(defaultValue ?? 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Input
      label="Quantity"
      type="number"
      min={1}
      name={name}
      value={value}
      placeholder="1"
      onChange={(e) => handleOnChange(Number(e.target.value))}
      suffix={
        <>
          <ActionIcon
            title="Decrement"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleDecrement()}
          >
            <PiMinusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
          <ActionIcon
            title="Increment"
            size="sm"
            variant="outline"
            className="scale-90 shadow-sm"
            onClick={() => handleIncrement()}
          >
            <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
          </ActionIcon>
        </>
      }
      suffixClassName="flex gap-1 items-center -me-2"
      error={error}
    />
  );
}

// multiple invoice items generate component
export function AddContactsItems({ watch, register, control, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });
  const firstName = watch('firstName') as string;
  const lastName = watch('lastName') as string;
  const position = watch('position') as string;
  const contactPhone = watch('contactPhone') as string;
  const email = watch('email') as string;


  return (
    <FormBlockWrapper
      title={'Contacts:'}
      description={'Add one or multiple contacts'}
      className="pt-7 @2xl:pt-9 @3xl:pt-11"
    >
      <div className="col-span-2 @container">
        {fields.map((field: any, index) => {
       

          return (
            <div
              key={field.id}
              className="mb-8 grid grid-cols-1 items-start rounded-lg border border-muted p-4 shadow @md:p-5 @xl:p-6"
            >
              <div className="grid w-full items-start gap-3 @md:grid-cols-2 @lg:gap-4 @xl:grid-cols-3 @2xl:gap-5 @4xl:grid-cols-4">
                <Input
                  label="Name"
                  placeholder="Enter contact name"
                  {...register(`contacts.${index}.firstName`)}
                  defaultValue={field.item}
                  error={errors?.contacts?.[index]?.firstName?.message}
                  className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
                />
                 <Input
                  label="Last Name"
                  placeholder="Enter contact lastname"
                  {...register(`contacts.${index}.lastName`)}
                  defaultValue={field.item}
                  error={errors?.contacts?.[index]?.lastName?.message}
                  className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
                />
        
        <Input
                  label="Position"
                  placeholder="Enter contact position"
                  {...register(`contacts.${index}.position`)}
                  defaultValue={field.item}
                  error={errors?.contacts?.[index]?.position?.message}
                  className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
                /> 
                <Input
                          label="Phone number"
                          placeholder="Enter contact phone number"
                          {...register(`contacts.${index}.contactPhone`)}
                          defaultValue={field.item}
                          error={errors?.contacts?.[index]?.contactPhone?.message}
                          className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
                        />
                         
        <Input
                  label="Email"
                  placeholder="Enter contact email"
                  {...register(`contacts.${index}.email`)}
                  defaultValue={field.item}
                  error={errors?.contacts?.[index]?.email?.message}
                  className="@md:col-span-2 @xl:col-span-3 @2xl:col-span-1 @4xl:col-span-2"
                />
              </div>
              <Button
                variant="text"
                color="danger"
                onClick={() => remove(index)}
                className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
              >
                <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
              </Button>
            </div>
          );
        })}

        <div className="flex w-full flex-col items-start justify-between @4xl:flex-row @4xl:pt-6">
          <Button
            onClick={() =>
              append({ item: '', description: '', quantity: 1, price: '' })
            }
            variant="flat"
            className="-mt-2 mb-7 w-full @4xl:mb-0 @4xl:mt-0 @4xl:w-auto"
          >
            <PiPlusBold className="me-1.5 h-4 w-4" /> Add Contact
          </Button>

       
        </div>
      </div>
    </FormBlockWrapper>
  );
}
