import z from "zod";

export const createUserZod = z.object({
    name: z.string().trim(),
    email: z.email(),
    password: z.string().trim(),
    role: z.enum ([
        "ADMIN",
        "STANDARD",
    ]).optional()
}) 