import { auth } from '@clerk/nextjs/server';

export async function validateUserAction() {
  'use server';

  const { userId } = await auth();

  if (!userId) {
    throw new Error('User not found');
  }

  return userId;
}
