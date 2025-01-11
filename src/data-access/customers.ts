import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { CustomerInsert, customers, CustomerSelect } from '@/db/schema';

export async function createCustomer(
  customer: CustomerInsert,
): Promise<CustomerSelect> {
  const [newCustomer] = await db.insert(customers).values(customer).returning();

  return newCustomer;
}

export async function getCustomersByUserId(
  userId: string,
): Promise<CustomerSelect> {
  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.userId, userId))
    .limit(1);

  return customer;
}
