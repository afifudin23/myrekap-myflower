import { formatters } from "@/utils";
import { z } from "zod";

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerCustomer = z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    customerCategory: z.preprocess(
        (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
            required_error: "Customer category is required",
            invalid_type_error: "Customer category must be a valid enum value",
        })
    ),
    password: z.string().min(5),
    confPassword: z.string().min(5),
});
