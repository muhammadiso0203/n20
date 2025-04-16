import z from "zod";

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
export const categorySchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(5),
  description: z.string().min(5),
  isActive: z.enum(["true", "false"]),
});

export const categoryUpdateSchema = categorySchema.partial();

// Order Schema
export const orderSchema = z.object({
  status: z.enum(["processing", "shipped", "delivered", "rejected"]),
  total: z.number(),
  product_id: z.string(),
});

export const orderUpdateSchema = orderSchema.partial();

// Product Schema
export const productSchema = z.object({
  name: z.string().min(5),
  price: z.number(),
  description: z.string().min(5),
  stock: z.number(),
  category_id: z.string(),
});

export const productUpdateSchema = productSchema.partial();
