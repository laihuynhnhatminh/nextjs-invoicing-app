import { z } from 'zod';

export const searchInvoice = z.object({
  id: z.number().positive().min(1),
});
