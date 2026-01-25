import { Metadata } from 'next';

import { resetPasswordAction } from '@/app/actions';
import { ActionMessageToast } from '@/components/ActionMessageToast';
import { AuthLayout } from '@/components/AuthLayout';
import { PasswordInput } from '@/components/PasswordInput';
import { SubmitButton } from '@/components/SubmitButton';
import { ActionMessage } from '@/types';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your demo account.',
};

export default async function ResetPassword(props: {
  searchParams: Promise<ActionMessage>;
}) {
  const message = await props.searchParams;

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <AuthLayout.Title>Reset password</AuthLayout.Title>
        <AuthLayout.Subtitle>
          Please enter your new password below.
        </AuthLayout.Subtitle>
      </AuthLayout.Header>

      <AuthLayout.Form action={resetPasswordAction}>
        <PasswordInput
          name="password"
          placeholder="New password"
          variant="secondary"
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm password"
          variant="secondary"
        />
        <SubmitButton formAction={resetPasswordAction} className="mt-6">
          Reset
        </SubmitButton>
      </AuthLayout.Form>

      <ActionMessageToast message={message} />
    </AuthLayout>
  );
}
