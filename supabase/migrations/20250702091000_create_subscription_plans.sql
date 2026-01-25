-- Create subscription plans table
CREATE TABLE public.subscription_plans
(
    id               uuid PRIMARY KEY         DEFAULT gen_random_uuid(),
    name             text    NOT NULL,
    billing_cycle    text    NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
    product_id       text,                                         -- Product ID
    price            numeric NOT NULL,
    thumbnail        text,                                         -- Optional plan image
    badge            text,                                         -- Optional UI label like "Popular"
    benefits         jsonb                    DEFAULT '[]'::jsonb, -- Array of { text, type }
    features         jsonb                    DEFAULT '{}'::jsonb, -- Structured feature flags
    checkout_note    text,                                         -- Optional note below the primary action
    created_at       timestamp with time zone DEFAULT now()
);

-- Ensure unique plan & billing cycle combinations
CREATE UNIQUE INDEX unique_subscription_plans
    ON public.subscription_plans (name, billing_cycle);

-- Public read access
CREATE
POLICY "Allow read access for all users"
  ON subscription_plans
  FOR
SELECT
    TO authenticated, anon
    USING (TRUE);

-- Disable write access for all users
CREATE
POLICY "Disable insert access for all users"
  ON subscription_plans
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (FALSE);

CREATE
POLICY "Disable update access for all users"
  ON subscription_plans
  FOR
UPDATE
    TO authenticated, anon
WITH CHECK (FALSE);

CREATE
POLICY "Disable delete access for all users"
  ON subscription_plans
  FOR DELETE
TO authenticated, anon
  USING (FALSE);
