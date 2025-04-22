import z from "zod";

// User Schema
export const userValidationSchema = z.object({
  fullname: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["user"]),
});

export const userValidationUpdateSchema = userValidationSchema.partial();


// Car Schema
export const carValidationSchema = z.object({})