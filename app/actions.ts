'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createAdminClient } from '@/config/supabase/adminClient';
import { createClient } from '@/config/supabase/server';
import {
  DatabaseFunction,
  DatabaseTable,
  OAuthProvider,
} from '@/constants/enums';
import { AppRoute, DashboardRoute } from '@/constants/routes';
import {
  addContactToAudience,
  sendNewsletterConfirmationEmail,
  sendWaitlistConfirmationEmail,
} from '@/services/email';
import { createCustomerPortal, createPolarCheckout } from '@/services/payment';
import {
  deleteOldAvatars,
  getCurrentUser,
  uploadAvatar,
} from '@/services/user';
import { ActionResponse } from '@/types';
import { EmailSchema } from '@/types/schemas';
import { encodedRedirect, generateSecureToken, normalizeError } from '@/utils';

export async function signUpAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const productId = formData.get('product_id')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password || !confirmPassword) {
    return encodedRedirect(
      'error',
      AppRoute.SignUpPage,
      'All fields are required.',
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      'error',
      AppRoute.SignUpPage,
      'Passwords do not match.',
    );
  }

  // Prepare redirect URL for email verification callback
  const redirectParams = new URLSearchParams();
  if (productId) {
    redirectParams.set('product_id', productId);
  }

  const emailRedirectTo = `${origin}${AppRoute.AuthCallbackPage}${
    redirectParams.toString() ? `?${redirectParams.toString()}` : ''
  }`;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', AppRoute.SignUpPage, error.message);
  }

  return encodedRedirect(
    'success',
    AppRoute.SignUpPage,
    'Thanks for signing up! Please check your email for a verification link.',
  );
}

export async function signInAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const productId = formData.get('product_id')?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      'error',
      AppRoute.SignInPage,
      'Email and password are required',
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', AppRoute.SignInPage, error.message);
  }

  const params = new URLSearchParams();
  if (productId) params.set('product_id', productId);

  const target = `${DashboardRoute.OverviewPage}?${params.toString()}`;

  return redirect(target);
}

export async function signInWithOAuthAction(formData: FormData) {
  const provider = formData.get('provider')?.toString() as OAuthProvider;
  const productId = formData.get('product_id')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const redirectParams = new URLSearchParams();
  if (productId) redirectParams.set('product_id', productId);

  const redirectTo = `${origin}${AppRoute.AuthCallbackPage}${
    redirectParams.toString() ? `?${redirectParams.toString()}` : ''
  }`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    return encodedRedirect(
      'error',
      AppRoute.SignInPage,
      `OAuth sign-in with ${provider} failed: ${error.message}`,
    );
  }

  redirect(data.url);
}

export async function signUpWithOAuthAction(formData: FormData) {
  const provider = formData.get('provider')?.toString() as OAuthProvider;
  const productId = formData.get('product_id')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const redirectParams = new URLSearchParams();
  if (productId) redirectParams.set('product_id', productId);

  const redirectTo = `${origin}${AppRoute.AuthCallbackPage}${
    redirectParams.toString() ? `?${redirectParams.toString()}` : ''
  }`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    return encodedRedirect(
      'error',
      AppRoute.SignUpPage,
      `OAuth sign-up with ${provider} failed: ${error.message}`,
    );
  }

  redirect(data.url);
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email')?.toString();
  const callbackUrl = formData.get('callbackUrl')?.toString();
  const origin = (await headers()).get('origin');

  if (!email) {
    return encodedRedirect(
      'error',
      AppRoute.ForgotPasswordPage,
      'Email is required',
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}${AppRoute.AuthCallbackPage}?redirect_to=${AppRoute.ResetPasswordPage}`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      AppRoute.ForgotPasswordPage,
      'Could not reset password',
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    AppRoute.ForgotPasswordPage,
    'Check your email for a link to reset your password.',
  );
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      AppRoute.ResetPasswordPage,
      'Password and confirm password are required',
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      AppRoute.ResetPasswordPage,
      'Passwords do not match',
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      AppRoute.ResetPasswordPage,
      'Password update failed',
    );
  }

  encodedRedirect('success', AppRoute.ResetPasswordPage, 'Password updated');
}

export async function signOutAction(): Promise<ActionResponse> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('SignOut Error', error.message);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function updateUserProfileAction(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const name = formData.get('name') as string;
  const avatarFile = formData.get('avatarFile') as File | null;
  const existingAvatar = formData.get('existingAvatar')?.toString() || '';
  const isAvatarRemoved = existingAvatar === '';

  let avatarUrl: string | null = null;

  if (avatarFile) {
    avatarUrl = await uploadAvatar(avatarFile, user.id);
  } else if (!isAvatarRemoved) {
    avatarUrl = existingAvatar || null;
  }

  const updateFields: Record<string, string | null> = { full_name: name };

  if (avatarFile || isAvatarRemoved) {
    updateFields.avatar_url = avatarUrl;
  }

  const { error: profileError } = await supabase
    .from(DatabaseTable.Profiles)
    .update(updateFields)
    .eq('id', user.id);

  if (profileError) {
    console.error('Error updating profile:', profileError.message);
    throw new Error('Failed to update profile');
  }

  return { success: true };
}

export async function deleteAccountAction(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const adminClient = createAdminClient();
  const user = await getCurrentUser();

  if (!user) {
    return encodedRedirect(
      'error',
      AppRoute.SignInPage,
      'User not authenticated',
    );
  }

  const isEmailUser = user.app_metadata?.provider === 'email';
  const password = formData.get('password')?.toString();

  if (isEmailUser) {
    if (!password) {
      return { success: false, error: 'Password is required' };
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password,
    });

    if (authError) {
      return { success: false, error: 'Incorrect password' };
    }
  }

  const userId = user.id;

  // Delete user data from all related tables
  const deleteResults = await Promise.allSettled([
    supabase.from('profiles').delete().eq('id', userId),
    supabase.from('projects').delete().eq('user_id', userId),
    supabase.from('api_tokens').delete().eq('user_id', userId),
    supabase.from('subscriptions').delete().eq('user_id', userId),
  ]);

  for (const result of deleteResults) {
    if (result.status === 'rejected') {
      console.error('Deletion failed:', result.reason);
    } else if (result.value.error) {
      console.error('Deletion error:', result.value.error.message);
    }
  }

  const { error: deleteError } =
    await adminClient.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error('Account deletion failed', deleteError.message);
    return { success: false, error: 'Account deletion failed' };
  }

  await deleteOldAvatars(userId);

  return { success: true };
}

export async function createProjectAction(
  formData: FormData,
): Promise<ActionResponse<{ id: string }>> {
  const supabase = await createClient();
  const name = formData.get('name')?.toString();

  if (!name) {
    return { success: false, error: 'Project name is required' };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { data, error } = await supabase
    .from(DatabaseTable.Projects)
    .insert({ name, user_id: user.id })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating project:', error.message);
    return { success: false, error: 'Failed to create project' };
  }

  return { success: true, data: { id: data.id } };
}

export async function deleteProjectAction(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const projectId = formData.get('id')?.toString();

  if (!projectId) {
    return { success: false, error: 'Project ID is required' };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { error } = await supabase
    .from(DatabaseTable.Projects)
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting project:', error.message);
    return { success: false, error: 'Failed to delete project' };
  }

  return { success: true };
}

export async function markProjectAsCompleteAction(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const projectId = formData.get('id')?.toString();

  if (!projectId) {
    return { success: false, error: 'Project ID is required' };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { error } = await supabase
    .from(DatabaseTable.Projects)
    .update({ status: 'completed' })
    .eq('id', projectId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error marking project as complete:', error.message);
    return { success: false, error: 'Failed to mark project as complete' };
  }

  return { success: true };
}

export async function createApiTokenAction(
  formData: FormData,
): Promise<ActionResponse<{ token: string }>> {
  const supabase = await createClient();
  const tokenName = formData.get('name')?.toString();

  if (!tokenName) {
    return { success: false, error: 'Token name is required' };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { rawToken, hashedToken, maskedToken } = await generateSecureToken();

  const { error } = await supabase.from(DatabaseTable.ApiTokens).insert({
    user_id: user.id,
    name: tokenName,
    private_token: hashedToken,
    public_token: maskedToken,
  });

  if (error) {
    console.error('Error creating API token:', error.message);
    return { success: false, error: 'Failed to create token' };
  }

  return { success: true, data: { token: rawToken } };
}

export async function deleteApiTokenAction(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const tokenId = formData.get('id')?.toString();

  if (!tokenId) {
    return { success: false, error: 'Token ID is required' };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { error } = await supabase
    .from(DatabaseTable.ApiTokens)
    .delete()
    .eq('id', tokenId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting API token:', error.message);
    return { success: false, error: 'Failed to delete token' };
  }

  return { success: true };
}

export async function createSubscriptionAction(
  formData: FormData,
): Promise<ActionResponse<{ redirectUrl: string }>> {
  const productId = formData.get('product_id')?.toString();

  if (!productId) {
    return { success: false, error: 'Missing product ID.' };
  }

  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user || !user.email) {
    return { success: false, error: 'User authentication failed.' };
  }

  try {
    const redirectUrl = await createPolarCheckout({
      productId: productId,
      customerEmail: user.email,
    });

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        customer_id: null,
        subscription_id: null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error(
        'Failed to mark subscription as pending:',
        updateError.message,
      );
    }

    return { success: true, data: { redirectUrl } };
  } catch (err) {
    const error = normalizeError(
      err,
      'Failed to create subscription checkout.',
    );
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateSubscriptionAction(
  formData: FormData,
): Promise<ActionResponse<{ redirectUrl: string }>> {
  const name = formData.get('name')?.toString();
  const billingCycle = formData.get('billing_cycle')?.toString();

  if (!name || !billingCycle) {
    return {
      success: false,
      error: 'Missing plan name or billing cycle.',
    };
  }

  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from(DatabaseTable.Subscriptions)
    .select('subscription_id, customer_id')
    .eq('user_id', user.id)
    .single();

  if (subscriptionError) {
    return {
      success: false,
      error: 'Failed to retrieve current subscription.',
    };
  }

  if (subscription?.subscription_id) {
    try {
      const { data: targetPlan, error: planError } = await supabase
        .from(DatabaseTable.SubscriptionPlans)
        .select('product_id')
        .eq('name', name)
        .eq('billing_cycle', billingCycle)
        .single();

      if (planError || !targetPlan) {
        return {
          success: false,
          error: 'Target subscription plan not found.',
        };
      }

      const redirectUrl = await createPolarCheckout({
        productId: targetPlan.product_id,
        customerEmail: user.email,
      });

      return {
        success: true,
        data: { redirectUrl },
      };
    } catch (err) {
      const error = normalizeError(
        err,
        'Failed to create plan change checkout.',
      );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  return {
    success: false,
    error: 'You are currently on the free plan. Please upgrade instead.',
  };
}

export async function manageSubscriptionAction(): Promise<
  ActionResponse<{ redirectUrl: string }>
> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'User authentication failed' };
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from(DatabaseTable.Subscriptions)
    .select('customer_id')
    .eq('user_id', user.id)
    .single();

  if (subscriptionError) {
    return { success: false, error: 'Failed to fetch subscription.' };
  }

  if (subscription?.customer_id) {
    try {
      const url = await createCustomerPortal({
        customerId: subscription.customer_id,
      });
      return { success: true, data: { redirectUrl: url } };
    } catch (err) {
      const error = normalizeError(err, 'Failed to fetch customer portal URL.');
      return { success: false, error: error.message };
    }
  }

  return {
    success: false,
    error:
      'You are currently on the free plan. There is no subscription to manage.',
  };
}

export async function joinWaitlistAction(
  formData: FormData,
): Promise<ActionResponse> {
  const email = formData.get('email')?.toString();
  const parsed = EmailSchema.safeParse(email);

  if (!parsed.success) {
    return { success: false, error: 'Invalid email address.' };
  }

  try {
    await addContactToAudience(parsed.data);
    await sendWaitlistConfirmationEmail(parsed.data);

    return { success: true };
  } catch (err) {
    const error = normalizeError(err, 'Failed to join the waitlist.');
    console.error('Error joining waitlist', error);
    return { success: false, error: error.message };
  }
}

export async function newsletterSubscribeAction(
  formData: FormData,
): Promise<ActionResponse> {
  const email = formData.get('email')?.toString();
  const parsed = EmailSchema.safeParse(email);

  if (!parsed.success) {
    return { success: false, error: 'Invalid email address.' };
  }

  try {
    await addContactToAudience(parsed.data);
    await sendNewsletterConfirmationEmail(parsed.data);

    return { success: true };
  } catch (err) {
    const error = normalizeError(err, 'Subscription failed.');
    console.error('Error subscribing to newsletter', error);
    return { success: false, error: error.message };
  }
}

export async function voteRoadmapAction(
  formData: FormData,
): Promise<ActionResponse<{ slug: string; votes: number }>> {
  const slug = formData.get('slug')?.toString();

  if (!slug) {
    return { success: false, error: 'Missing slug' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc(DatabaseFunction.IncrementVote, {
    slug_input: slug,
  });

  if (error || data === null) {
    return { success: false, error: error?.message || 'Vote failed' };
  }

  return { success: true, data: { slug, votes: data } };
}

export async function unvoteRoadmapAction(
  formData: FormData,
): Promise<ActionResponse<{ slug: string; votes: number }>> {
  const slug = formData.get('slug')?.toString();

  if (!slug) {
    return { success: false, error: 'Missing slug' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc(DatabaseFunction.DecrementVote, {
    slug_input: slug,
  });

  if (error || data === null) {
    return { success: false, error: error?.message || 'Unvote failed' };
  }

  return { success: true, data: { slug, votes: data } };
}

export async function startCheckoutAction(
  formData: FormData,
): Promise<ActionResponse<{ redirectUrl: string }>> {
  try {
    const productId = formData.get('product_id')?.toString();
    if (!productId) {
      return { success: false, error: 'Missing product ID.' };
    }

    const redirectUrl = await createPolarCheckout({
      productId: productId,
    });

    return { success: true, data: { redirectUrl } };
  } catch (error) {
    console.error('Checkout error:', error);
    return { success: false, error: 'Failed to start checkout.' };
  }
}
