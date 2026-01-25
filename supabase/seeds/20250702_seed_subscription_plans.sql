-- Insert default subscription plans
INSERT INTO public.subscription_plans
(name, billing_cycle, product_id, price, thumbnail, features, badge, benefits, checkout_note)
VALUES
-- Free Plan
('free', 'monthly', NULL, 0, 'https://example.com/thumbnails/free.png',
 jsonb_build_object(
         'maxProjects', 3,
         'maxApiTokens', 1,
         'maxApiRequests', 10,
         'brandingGenerator', FALSE
 ),
 NULL,
 jsonb_build_array(
         jsonb_build_object('text', 'Perfect for getting started', 'type', 'default'),
         jsonb_build_object('text', 'Access essential features to test the waters', 'type', 'default'),
         jsonb_build_object('text', 'Enjoy reliable support and updates at no cost', 'type', 'disabled')
 ),
 'No credit card required'),
('free', 'yearly', NULL, 0, 'https://example.com/thumbnails/free.png',
 jsonb_build_object(
         'maxProjects', 3,
         'maxApiTokens', 1,
         'maxApiRequests', 10,
         'brandingGenerator', FALSE
 ),
 NULL,
 jsonb_build_array(
         jsonb_build_object('text', 'Perfect for getting started', 'type', 'default'),
         jsonb_build_object('text', 'Access essential features to test the waters', 'type', 'default'),
         jsonb_build_object('text', 'Enjoy reliable support and updates at no cost', 'type', 'disabled')
 ),
 'No credit card required'),

-- Plus Plan
('plus', 'monthly', NULL, 20, 'https://example.com/thumbnails/plus.png',
 jsonb_build_object(
         'maxProjects', 5,
         'maxApiTokens', 3,
         'maxApiRequests', 100,
         'brandingGenerator', TRUE
 ),
 'Popular',
 jsonb_build_array(
         jsonb_build_object('text', 'Unlock premium features for serious growth', 'type', 'default'),
         jsonb_build_object('text', 'Ideal for startups and small teams', 'type', 'default'),
         jsonb_build_object('text', 'Affordable tools to boost productivity and reach', 'type', 'default')
 ),
 'Switch to Plus anytime'),
('plus', 'yearly', NULL, 200, 'https://example.com/thumbnails/plus.png',
 jsonb_build_object(
         'maxProjects', 5,
         'maxApiTokens', 3,
         'maxApiRequests', 100,
         'brandingGenerator', TRUE
 ),
 'Popular',
 jsonb_build_array(
         jsonb_build_object('text', 'Unlock premium features for serious growth', 'type', 'default'),
         jsonb_build_object('text', 'Ideal for startups and small teams', 'type', 'default'),
         jsonb_build_object('text', 'Affordable tools to boost productivity and reach', 'type', 'default')
 ),
 'Switch to Plus anytime'),

-- Pro Plan
('pro', 'monthly', NULL, 200, 'https://example.com/thumbnails/pro.png',
 jsonb_build_object(
         'maxProjects', NULL,
         'maxApiTokens', 10,
         'maxApiRequests', NULL,
         'brandingGenerator', TRUE
 ),
 NULL,
 jsonb_build_array(
         jsonb_build_object('text', 'Built for advanced business needs', 'type', 'default'),
         jsonb_build_object('text', 'Achieve more with comprehensive capabilities', 'type', 'default'),
         jsonb_build_object('text', 'Access all features and priority support', 'type', 'accent')
 ),
 'Best for power users'),
('pro', 'yearly', NULL, 2000, 'https://example.com/thumbnails/pro.png',
 jsonb_build_object(
         'maxProjects', NULL,
         'maxApiTokens', 10,
         'maxApiRequests', NULL,
         'brandingGenerator', TRUE
 ),
 NULL,
 jsonb_build_array(
         jsonb_build_object('text', 'Built for advanced business needs', 'type', 'default'),
         jsonb_build_object('text', 'Achieve more with comprehensive capabilities', 'type', 'default'),
         jsonb_build_object('text', 'Access all features and priority support', 'type', 'accent')
 ),
 'Best for power users');
