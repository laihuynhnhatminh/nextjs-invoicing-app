import { headers } from 'next/headers';

export async function getIp(): Promise<string | null> {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  const realIp = headerList.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}
