import { z } from 'zod';

import { statusEnum } from '@/db/schema';

export const searchInvoice = z.object({
  id: z.number().positive().min(1),
  organizationId: z.string().optional(),
});

export const updateInvoice = z.object({
  id: z.number().positive().min(1),
  status: z.enum(statusEnum.enumValues),
  organizationId: z.string().optional(),
});

export const deleteInvoice = z.object({
  id: z.number().positive().min(1),
  organizationId: z.string().optional(),
});
