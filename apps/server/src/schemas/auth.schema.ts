import { object, string } from "zod";

export const loginUserSchema = object({
  username: string(),
  pin: string().length(6),
})