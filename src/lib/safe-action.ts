import { createServerActionProcedure } from 'zsa';

import { rateLimitByKey } from '@/lib/limiter';
import { PublicError } from '@/use-cases/errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = process.env.NODE_ENV === 'development';
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? 'ERROR',
      message: `${!isAllowedError && isDev ? 'DEV ONLY ENABLED - ' : ''}${
        err.message
      }`,
    };
  } else {
    return {
      code: 'ERROR',
      message: 'Something went wrong',
    };
  }
}

export const authenticatedAction = (userId: string) =>
  createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async () => {
      await rateLimitByKey({
        key: `${userId}-global`,
        limit: 10,
        window: 10000,
      });
    });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    await rateLimitByKey({
      key: `unauthenticated-global`,
      limit: 10,
      window: 10000,
    });
  });
