import { createCustomer, getCustomersByUserId } from '@/data-access/customers';
import { CustomerInsert, CustomerSelect } from '@/db/schema';

export async function getCustomerUseCase(
  customer: CustomerInsert,
): Promise<CustomerSelect> {
  const existingCustomer = await getCustomersByUserId(customer.userId);

  if (!existingCustomer) {
    return createCustomer(customer);
  }

  return existingCustomer;
}
