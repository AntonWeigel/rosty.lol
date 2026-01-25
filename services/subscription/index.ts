'use server';

import { createAdminClient } from '@/config/supabase/adminClient';
import { createClient } from '@/config/supabase/server';
import {
  BillingCycle,
  DatabaseTable,
  SubscriptionPlanName,
} from '@/constants/enums';
import { getCurrentUser } from '@/services/user';
import {
  Subscription,
  SubscriptionPlan,
  SubscriptionPlanFeatures,
} from '@/types';
import { convertToCamelCase, mapToCamelCase, toIso } from '@/utils';

/**
 * Fetch all available subscription plans.
 *
 * @returns A list of available subscription plans.
 */
export async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(DatabaseTable.SubscriptionPlans)
    .select(
      'id, name, billing_cycle, price, badge, thumbnail, checkout_note, product_id, benefits, features',
    )
    .order('price', { ascending: true });

  if (error) {
    console.log('Error fetching subscription plan ', error);
    return [];
  }

  return mapToCamelCase(data);
}

/**
 * Fetch the current user's subscription.
 *
 * @returns The current subscription or null if not found.
 */
export async function fetchCurrentSubscription(): Promise<Subscription | null> {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from(DatabaseTable.Subscriptions)
    .select(
      'id, user_id, subscription_plan_id, subscription_id, status, created_at, expires_at',
    )
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return convertToCamelCase(data);
}

/**
 * Fetch the current user's subscription plan.
 *
 * @returns The current subscription plan or null if not found.
 */
export async function fetchCurrentSubscriptionPlan(): Promise<SubscriptionPlan | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const subscription = await fetchCurrentSubscription();
  const plans = await fetchSubscriptionPlans();

  if (!subscription) {
    return (
      plans.find(
        (plan) =>
          plan.name === SubscriptionPlanName.Free &&
          plan.billingCycle === BillingCycle.Monthly,
      ) ?? null
    );
  }

  return (
    plans.find((plan) => plan.id === subscription.subscriptionPlanId) ?? null
  );
}

/**
 * Fetch all subscription plans and mark the current one.
 *
 * @returns Plans with the current plan marked as `current: true`.
 */
export async function fetchSubscriptionPlansWithCurrent(): Promise<
  SubscriptionPlan[]
> {
  const [plans, currentPlan] = await Promise.all([
    fetchSubscriptionPlans(),
    fetchCurrentSubscriptionPlan(),
  ]);

  return plans.map((plan) => {
    const isCurrent =
      currentPlan?.name === SubscriptionPlanName.Free
        ? plan.name === SubscriptionPlanName.Free
        : plan.id === currentPlan?.id;

    return { ...plan, current: isCurrent };
  });
}

/**
 * Fetch a specific feature from the user's subscription plan.
 *
 * @param userId - The user's ID.
 * @param featureKey - The name of the feature to retrieve.
 * @returns The value of the feature or null.
 */
export async function fetchFeatureForUser<
  T extends keyof SubscriptionPlanFeatures,
>(userId: string, featureKey: T): Promise<SubscriptionPlanFeatures[T] | null> {
  const supabase = await createClient();

  const { data: subscription, error: subscriptionError } = await supabase
    .from(DatabaseTable.Subscriptions)
    .select('subscription_plan_id')
    .eq('user_id', userId)
    .single();

  if (subscriptionError || !subscription) {
    console.error('Error fetching user subscription:', subscriptionError);
    return null;
  }

  const { data, error } = await supabase
    .from(DatabaseTable.SubscriptionPlans)
    .select('features')
    .eq('id', subscription.subscription_plan_id)
    .single();

  if (error || !data) {
    console.error('Error fetching subscription plan features:', error);
    return null;
  }

  const features: SubscriptionPlanFeatures = data.features ?? {};

  if (!(featureKey in features)) {
    throw new Error(`Feature '${featureKey}' not found in subscription plan`);
  }

  return features[featureKey] as SubscriptionPlanFeatures[T];
}

/**
 * Fetch a specific feature from the current user's subscription plan.
 *
 * @param featureKey - The name of the feature to retrieve.
 * @returns The value of the feature or null.
 */
export async function fetchFeature<T extends keyof SubscriptionPlanFeatures>(
  featureKey: T,
): Promise<SubscriptionPlanFeatures[T] | null> {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return fetchFeatureForUser(user.id, featureKey);
}

/**
 * Updates or creates a subscription based on webhook data.
 *
 * @param subscriptionId    Polar subscription ID.
 * @param customerEmail     Customer’s e-mail (user lookup).
 * @param customerId        Polar customer ID (optional).
 * @param status            Current subscription status.
 * @param productId         Polar product ID → subscription plan map.
 * @param currentPeriodStart Billing-cycle start (Date | ISO | null).
 * @param currentPeriodEnd   Billing-cycle end   (Date | ISO | null).
 * @param canceledAt        Cancellation timestamp (Date | ISO | null).
 * @returns                 `true` on success, otherwise `false`.
 */
export async function updateSubscription({
  subscriptionId,
  customerEmail,
  customerId,
  status,
  productId,
  currentPeriodStart,
  currentPeriodEnd,
  canceledAt,
}: {
  subscriptionId: string;
  customerEmail: string;
  customerId?: string;
  status: string;
  productId: string;
  currentPeriodStart?: Date | string | null;
  currentPeriodEnd?: Date | string | null;
  canceledAt?: Date | string | null;
}): Promise<boolean> {
  const supabase = createAdminClient();

  try {
    const { data: user, error: userError } = await supabase
      .from(DatabaseTable.Profiles)
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (userError || !user) {
      console.error('User not found for email:', customerEmail);
      return false;
    }

    const { data: subscriptionPlan, error: planError } = await supabase
      .from(DatabaseTable.SubscriptionPlans)
      .select('id')
      .eq('product_id', productId)
      .single();

    if (planError || !subscriptionPlan) {
      console.error('Subscription plan not found for product_id:', productId);
      return false;
    }

    const { error } = await supabase.from(DatabaseTable.Subscriptions).upsert(
      {
        user_id: user.id,
        subscription_plan_id: subscriptionPlan.id,
        subscription_id: subscriptionId,
        customer_id: customerId,
        status: status,
        current_period_start: toIso(currentPeriodStart),
        current_period_end: toIso(currentPeriodEnd),
        canceled_at: toIso(canceledAt),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

    if (error) {
      console.error('Failed to update subscription:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating subscription:', error);
    return false;
  }
}

/**
 * Cancels a subscription by updating its status and cancellation date.
 *
 * @param subscriptionId  Polar subscription ID.
 * @param canceledAt      Cancellation timestamp (Date | ISO | null).
 * @returns               `true` on success, otherwise `false`.
 */
export async function cancelSubscription({
  subscriptionId,
  canceledAt,
}: {
  subscriptionId: string;
  canceledAt?: Date | string | null;
}): Promise<boolean> {
  const supabase = createAdminClient();

  try {
    const canceledAtIso = toIso(canceledAt) ?? new Date().toISOString();

    const { error } = await supabase
      .from(DatabaseTable.Subscriptions)
      .update({
        status: 'canceled',
        canceled_at: canceledAtIso,
        updated_at: new Date().toISOString(),
      })
      .eq('subscription_id', subscriptionId);

    if (error) {
      console.error('Failed to cancel subscription:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return false;
  }
}
