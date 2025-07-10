import { z } from "zod";

export const createTransactionSchema = z.object({
    orderCode: z.string({ required_error: "Order code is required" }),
});
