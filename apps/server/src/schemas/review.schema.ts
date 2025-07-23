import { z } from "zod";

export const create = z.object({
    rating: z.coerce.number({ required_error: "Rating is required" }).min(1).max(5),
    comment: z.string({ required_error: "Comment is required" }),
});

export const update = z.object({
    rating: z.coerce.number().min(1).max(5).optional(),
    comment: z.string().optional(),
});