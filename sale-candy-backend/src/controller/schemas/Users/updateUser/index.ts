import z from "zod";

export const updateUserZod = z.object({
    name: z.string().trim().optional(),
    email: z.email().optional(),
    password: z.string().trim().optional(),
    role: z.enum ([
        "ADMIN",
        "STANDARD",
    ]).optional()
}) 