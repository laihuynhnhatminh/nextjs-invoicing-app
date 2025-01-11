import { headers } from 'next/headers';

export async function getOrigin() {
  const headerList = await headers();

  const origin = headerList.get('origin');

  if (!origin) {
    throw new Error('Origin header not found');
  }

  return origin;
}
