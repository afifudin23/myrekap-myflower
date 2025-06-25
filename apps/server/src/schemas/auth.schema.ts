import { object, string } from "zod";

export const loginUserSchema = object({
  username: string(),
  password: string().length(6),
})