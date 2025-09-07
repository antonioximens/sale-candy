import z from "zod";

export const checkEmailZod = z.object({
    email: z.email()
})