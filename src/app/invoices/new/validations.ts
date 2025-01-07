import { z } from 'zod';

import { statusEnum } from '@/db/schema';

export const createInvoiceSchema = z.object({
  value: z.number().positive().min(1),
  status: z.enum(statusEnum.enumValues).default('open'),
  createTs: z.date().optional(),
  userId: z.string().min(1),
  description: z.string().min(1),
});
