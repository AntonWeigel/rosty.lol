import { Metadata } from 'next';
import Link from 'next/link';

import { forgotPasswordAction } from '@/app/actions';
import { ActionMessageToast } from '@/components/ActionMessageToast';
import { AuthLayout } from '@/components/AuthLayout';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/Input';
import { AppRoute } from '@/constants/routes';
import { ActionMessage } from '@/types';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password to regain access to your demo account.',
};

export default async function ForgotPassword(props: {
  searchParams: Promise<ActionMessage>;
}) {
  const message = await props.searchParams;

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <AuthLayout.Title>Reset password</AuthLayout.Title>
        <AuthLayout.Subtitle>
          Already have an account?{' '}
          <Link href={AppRoute.SignInPage} className="underline">
            Sign in
          </Link>
        </AuthLayout.Subtitle>
      </AuthLayout.Header>

      <AuthLayout.Form>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton formAction={forgotPasswordAction} className="mt-6">
          Reset
        </SubmitButton>
      </AuthLayout.Form>

      <ActionMessageToast message={message} />
    </AuthLayout>
  );
}
