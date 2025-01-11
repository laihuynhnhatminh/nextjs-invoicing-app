import { z } from 'zod';

import { StatusEnum, statusEnum } from '@/db/schema';

export const createInvoiceSchema = z.object({
  value: z.number().positive().min(1),
  status: z.enum(statusEnum.enumValues).default(StatusEnum.OPEN),
  name: z.string().min(1),
  email: z.string().email().min(1),
  createTs: z.date().optional(),
  userId: z.string().min(1),
  description: z.string().min(1),
  organizationId: z.string().optional(),
});
