import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import z from "zod";

const router = Router();

router.post('/register',async(req:Request, res:Response, next:NextFunction) => {
    const createUserZodSchema = z.object({
         name: z
         .string({error: "Name Must be string"})
         .min(2, {message: "Name atleast 2 character"})
         .max(50, {message: "Name is longer than 50"}),
          email:z 
          .string({error: "Email Must be string"})
          .email({message: "Invalid Email address format"})
         .min(5, {message: "Email atleast 5 character"})
         .max(100, {message: "Email is longer than 100"}),
          password: z
          .string({error: "Password Must be string"})
         .min(8, {message: "Password must be 8 character long"})
         .regex(/^(?=.*[A-Z])/,{
            message: "Password contain must 1 uppercase letter"
         })
         .regex(/^(?=.*[!@#$%^&*])/,{
            message: "Password must contain at least 1 special character"
         })
         .regex(/^(?=.*\d)/,{
            message: "Password contain must 1 number"
         }),
          phone: z
          .string({error: "Phone number Must be string"})
         .regex(/^(?:\+8801\d{9}|01\d{9})$/,{
            message: "Number should be 01xxxxxxxxx or +8801xxxxxxx"
         })
         .optional(),
          
          address: z
          .string({error: "Address Must be string"})
         .min(200, {message: "Address atleast 200 character"})
         .optional(),

         
    })

    req.body = await createUserZodSchema.parseAsync(req.body);

    next()
}, userController.createUser);
router.get('/', userController.getAllUsers);


export const userRoutes = router;