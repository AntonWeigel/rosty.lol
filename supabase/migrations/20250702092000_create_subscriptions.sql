-- Create subscriptions table
CREATE TABLE public.subscriptions
(
    id                   uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id              uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
    subscription_plan_id uuid NOT NULL REFERENCES public.subscription_plans (id),
    subscription_id      text UNIQUE,
    customer_id          text UNIQUE,
    status               text        DEFAULT 'active' CHECK (
        status IN ('active', 'canceled', 'past_due', 'expired', 'incomplete', 'trialing')
        ),
    created_at           timestamptz DEFAULT now(),
    updated_at           timestamptz, -- auto-maintained (see trigger)
    expires_at           timestamptz,
    current_period_start timestamptz,
    current_period_end   timestamptz,
    canceled_at          timestamptz
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own subscription
CREATE
POLICY "Users can view their own subscription"
    ON PUBLIC.subscriptions
    FOR
SELECT
    USING (auth.uid() = user_id);

-- Allow users to update their own subscription
CREATE
POLICY "Users can update their own subscription"
    ON PUBLIC.subscriptions
    FOR
UPDATE
    USING (auth.uid() = user_id);

-- Trigger: keep updated_at in sync on every UPDATE
CREATE
OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at
= NOW();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_updated_at ON PUBLIC.subscriptions;

CREATE TRIGGER trg_set_updated_at
    BEFORE UPDATE
    ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
