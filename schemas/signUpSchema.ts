import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
});

export default signUpSchema;
