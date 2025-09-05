import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name Must be string" })
    .min(2, { message: "Name atleast 2 character" })
    .max(50, { message: "Name is longer than 50" }),
  email: z
    .string({ error: "Email Must be string" })
    .email({ message: "Invalid Email address format" })
    .min(5, { message: "Email atleast 5 character" })
    .max(100, { message: "Email is longer than 100" }),
  password: z
    .string({ error: "Password Must be string" })
    .min(8, { message: "Password must be 8 character long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password contain must 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password contain must 1 number",
    }),
  phone: z
    .string({ error: "Phone number Must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: "Number should be 01xxxxxxxxx or +8801xxxxxxx",
    })
    .optional(),

  address: z
    .string({ error: "Address Must be string" })
    .min(200, { message: "Address atleast 200 character" })
    .optional(),
});
export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "Name Must be string" })
    .min(2, { message: "Name atleast 2 character" })
    .max(50, { message: "Name is longer than 50" })
    .optional(),
  password: z
    .string({ error: "Password Must be string" })
    .min(8, { message: "Password must be 8 character long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password contain must 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password contain must 1 number",
    })
    .optional(),
  phone: z
    .string({ error: "Phone number Must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: "Number should be 01xxxxxxxxx or +8801xxxxxxx",
    })
    .optional(),

  address: z
    .string({ error: "Address Must be string" })
    .min(200, { message: "Address atleast 200 character" })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z.boolean({ error: "Delete must be true or false" }).optional(),
  isVerified: z.boolean({ error: "Verified must be true or false" }).optional(),
});
