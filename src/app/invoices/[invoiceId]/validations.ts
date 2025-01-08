import { z } from 'zod';

import { statusEnum } from '@/db/schema';

export const searchInvoice = z.object({
  id: z.number().positive().min(1),
});

export const updateInvoice = z.object({
  id: z.number().positive().min(1),
  status: z.enum(statusEnum.enumValues),
});

export const deleteInvoice = z.object({
  id: z.number().positive().min(1),
});
