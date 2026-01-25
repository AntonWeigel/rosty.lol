import { Metadata } from 'next';
import Link from 'next/link';

import { signInAction, signInWithOAuthAction } from '@/app/actions';
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
  title: 'Sign In',
  description: 'Log into your demo account to explore the starter features.',
};

export default async function Login(props: {
  searchParams: Promise<ActionMessage>;
}) {
  const message = await props.searchParams;
  const productId = message.product_id;

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <AuthLayout.Title>Sign in</AuthLayout.Title>
        <AuthLayout.Subtitle>
          Don&apos;t have an account?{' '}
          <Link
            href={{
              pathname: AppRoute.SignUpPage,
              query: productId ? { product_id: productId } : undefined,
            }}
            className="underline"
          >
            Sign up
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

        <div className="w-full text-right">
          <PasswordInput
            name="password"
            placeholder="Your password"
            variant="secondary"
          />

          {productId && (
            <input type="hidden" name="product_id" value={productId} />
          )}

          <Link
            className="text-secondary-dark dark:text-neutral text-xs underline"
            href={AppRoute.ForgotPasswordPage}
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton pendingText="Signing In…" formAction={signInAction}>
          Sign in
        </SubmitButton>
      </AuthLayout.Form>

      <AuthLayout.Separator>or</AuthLayout.Separator>

      <AuthLayout.Social>
        {Object.keys(SocialProvidersMap).map((provider) => (
          <SocialLoginButton
            key={provider}
            provider={provider as OAuthProvider}
            productId={productId}
            action={signInWithOAuthAction}
          />
        ))}
      </AuthLayout.Social>

      <ActionMessageToast message={message} />
    </AuthLayout>
  );
}
