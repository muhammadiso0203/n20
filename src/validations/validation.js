import z, { ZodSchema } from "zod";

// authSchema
const signUpSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5).max(15),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(15),
});

export const authSchema = {
  signIn: signInSchema,
  signUp: signUpSchema,
};

export const authUpdateSchema = signUpSchema.partial();

// Category Schema
export const categoryValidation = z.object({
  name: z.string().min(3),
  slug: z.string().min(5),
  description: z.string().min(5),
  isActive: z.enum(["true", "false"]),
});

export const categoryUpdateValidation = categoryValidation.partial();

// Order Schema
export const orderValidation = z.object({
  status: z.enum(["processing", "shipped", "delivered", "rejected"]),
  total: z.number(),
  product_id: z.string(),
});

export const orderUpdateValidation = orderValidation.partial();

// Product Schema
export const productValidation = z.object({
  name: z.string().min(5),
  price: z.number(),
  description: z.string().min(5),
  stock: z.number(),
  category_id: z.string(),
});

export const productUpdateValidation = productValidation.partial();

// Admin Schema
export const adminValidation = z.object({
  username: z.string().min(5),
  password: z.string().min(4),
});

export const adminUpdateValidation = adminValidation.partial();

