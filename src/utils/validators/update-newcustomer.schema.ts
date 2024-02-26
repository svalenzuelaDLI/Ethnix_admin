import { z } from 'zod';
import { toZod } from 'tozod';
import { messages } from '@/config/messages';
import { INewCustomer } from '@/types/models/newcustomers';

// export const newcustomersFormSchema: toZod<INewCustomer> = z.object({
//   customerName: z.string().min(1, { message: messages.generalFieldRequired }),
//   id: z.coerce.number(),
//   status: z.coerce.number(),
//   contacts: z.ZodArray<z.ZodObject<{
//       id: z.ZodNumber;
//       customerId: z.ZodNumber;
//       firstName: z.ZodString;
//       lastName: z.ZodString;
//       position: z.ZodString;
//       contactPhone: z.ZodString;
//       email: z.ZodString;
//   }
// });


export const newcustomerFormSchema = z.object({
  customerName: z.string().min(1, { message: messages.generalFieldRequired }),
  federalTax: z.string().min(1, { message: messages.generalFieldRequired }),
  siteWeb: z.string().optional(),
  storeEmail: z.string().min(1, { message: messages.generalFieldRequired }),
  resalesTaxCertificate: z.string().min(1, { message: messages.generalFieldRequired }),
  storePhone: z.string().optional(),
  street: z.string({
    required_error: 'This field is required',  //example
  }),
  // createDate: z.date({
  //   required_error: messages.createDateIsRequired,
  // }),
  city: z.string({
    required_error: messages.generalFieldRequired,
  }),
  zipCode: z.coerce
    .number()
    .min(1, { message: messages.generalFieldRequired }),
    state: z.string({
      required_error: messages.generalFieldRequired,
    }),
  contacts: z.array(
    z.object({
      firstName: z.string().min(1, { message: messages.itemNameIsRequired }),
      email: z.string().min(1, { message: messages.generalFieldRequired }),
    })
  ),
});

// generate form types from zod validation schema
export type newcustomerFormInput = z.infer<typeof newcustomerFormSchema>;
