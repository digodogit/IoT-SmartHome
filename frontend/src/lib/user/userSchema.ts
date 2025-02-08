import { z } from "zod";

export const userLogInSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type UserLogInType = z.infer<typeof userLogInSchema>;
