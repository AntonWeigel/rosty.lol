import { Metadata } from 'next';
import Link from 'next/link';

import { signUpAction, signUpWithOAuthAction } from '@/app/actions';
import { ActionMessageToast } from '@/components/ActionMessageToast';
import { AuthLayout } from '@/components/AuthLayout';
import { PasswordInput } from '@/components/PasswordInput';
import { SocialLoginButton } from '@/components/SocialLoginButton';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/ui/Input';
import { OAuthProvider } from '@/constants/enums';
import { SocialProvidersMap } from '@/constants/maps';
import { AppRoute } from '@/constants/routes';
import { ActionMessage } from '@/types';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create your demo account and start exploring the starter template.',
};

export default async function Signup(props: {
  searchParams: Promise<ActionMessage>;
}) {
  const message = await props.searchParams;
  const productId = message.product_id;

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <AuthLayout.Title>Sign up</AuthLayout.Title>
        <AuthLayout.Subtitle>
          Already have an account?{' '}
          <Link
            href={{
              pathname: AppRoute.SignInPage,
              query: productId ? { product_id: productId } : undefined,
            }}
            className="underline"
          >
            Sign in
          </Link>
        </AuthLayout.Subtitle>
      </AuthLayout.Header>

      <AuthLayout.Form>
        <Input
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          variant="secondary"
          required
        />
        <PasswordInput
          name="password"
          placeholder="Your password"
          variant="secondary"
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm your password"
          variant="secondary"
        />

        {productId && (
          <input type="hidden" name="product_id" value={productId} />
        )}

        <SubmitButton
          formAction={signUpAction}
          pendingText="Signing up…"
          className="mt-6"
        >
          Sign up
        </SubmitButton>
      </AuthLayout.Form>

      <AuthLayout.Separator>or</AuthLayout.Separator>

      <AuthLayout.Social label="Sign up with social account">
        {Object.keys(SocialProvidersMap).map((provider) => (
          <SocialLoginButton
            key={provider}
            provider={provider as OAuthProvider}
            productId={productId}
            action={signUpWithOAuthAction}
          />
        ))}
      </AuthLayout.Social>

      <ActionMessageToast message={message} />
    </AuthLayout>
  );
}
