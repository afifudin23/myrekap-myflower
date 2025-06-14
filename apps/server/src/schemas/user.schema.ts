import z, { object, string } from "zod";

export const createNewUserSchema = object({
  username: string(),
  email: string().email(),
  pin: string().length(6),
  confPin: string().length(6),
  role: z.enum(["ADMIN", "SUPERADMIN"]).default("ADMIN"),
});

export const updatedUserSchema = object({
  username: string().optional(),
  email: string().email().optional(),
  pin: string().length(6).optional(),
  confPin: string().length(6).optional(),
  role: z.enum(["ADMIN", "SUPERADMIN"]).optional(),
});
