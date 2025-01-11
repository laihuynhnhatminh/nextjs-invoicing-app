import { z } from 'zod';

export const searchInvoices = z.object({
  organizationId: z.string().optional(),
});
