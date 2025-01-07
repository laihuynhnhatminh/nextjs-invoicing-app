'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { AnimatePresence, motion } from 'framer-motion';

import { SignUpGoogleIcon } from '@/app/sign-up/[[...sign-up]]/_components/sign-up-google-icon';
import { SignUpIcon } from '@/app/sign-up/[[...sign-up]]/_components/sign-up-icon';

export default function SignInPage() {
  return (
    <div className="grid w-full flex-grow items-center bg-zinc-100 px-4 sm:justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <SignUpIcon />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
              Sign in to Invoicipedia
            </h1>
          </header>
          <div className="rounded-xl bg-neutral-100 p-5">
            <div className="space-y-2">
              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
              >
                <SignUpGoogleIcon />
                Sign In with Google
              </Clerk.Connection>
            </div>
          </div>
          <Clerk.Field name="identifier">
            <Clerk.Label className="sr-only">Email</Clerk.Label>
            <Clerk.Label className="text-sm font-medium text-zinc-950">
              Email
            </Clerk.Label>
            <Clerk.Input
              type="email"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
          >
            Sign In
          </SignIn.Action>
          <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
            >
              Sign up
            </Clerk.Link>
          </p>
        </SignIn.Step>
        <SignIn.Step
          name="verifications"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <SignIn.Strategy name="email_code">
            <header className="text-center">
              <SignUpIcon />
              <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                Verify email code
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Field name="code">
              <Clerk.Label className="sr-only">Email code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                placeholder="Email code"
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
            >
              Continue
            </SignIn.Action>
          </SignIn.Strategy>
          <SignIn.Strategy name="phone_code">
            <header className="text-center">
              <SignUpIcon />
              <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                Verify Authenticator code
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Field name="code">
              <Clerk.Label className="sr-only">Authenticator code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                placeholder="Authenticator code"
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
            >
              Sign Up
            </SignIn.Action>
          </SignIn.Strategy>
          <SignIn.Strategy name="totp">
            <header className="text-center">
              <SignUpIcon />
              <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                Verify email code
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Input
              type="otp"
              required
              className="flex justify-center gap-1"
              render={({ value, status }) => (
                <div
                  data-status={status}
                  className="relative h-9 w-8 rounded-md bg-white ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-sky-400/10 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.sky.400/30%)] data-[status=selected]:ring-sky-400"
                >
                  <AnimatePresence>
                    {value && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
                        className="absolute inset-0 flex items-center justify-center text-zinc-950"
                      >
                        {value}
                      </motion.span>
                    )}
                    {value}
                  </AnimatePresence>
                  {status === 'cursor' && (
                    <motion.div
                      layoutId="otp-input-focus"
                      transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
                      className="absolute inset-0 z-10 rounded-[inherit] border border-sky-400 bg-sky-400/10 shadow-[0_0_8px_2px_theme(colors.sky.400/30%)]"
                    />
                  )}
                </div>
              )}
            />
            <SignIn.Action
              submit
              className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
            >
              Continue
            </SignIn.Action>
          </SignIn.Strategy>
          <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
            >
              Sign up
            </Clerk.Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
