import z, { object, string } from "zod";

export const createUserSchema = object({
  username: string(),
  email: string().email(),
  phoneNumber: string(),
  password: string().min(5),
  confPassword: string().min(5),
  role: z.enum(["ADMIN", "SUPERADMIN"]).default("ADMIN"),
});

export const updatedUserSchema = object({
  username: string().optional(),
  email: string().email().optional(),
  phoneNumber: string().optional(),
  password: string().min(5).optional(),
  confPassword: string().min(5).optional(),
  role: z.enum(["ADMIN", "SUPERADMIN"]).optional(),
});
