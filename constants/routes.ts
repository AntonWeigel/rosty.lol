export const AppRoute = {
  AuthCallbackPage: '/auth/callback',
  BlogPage: '/blog',
  ChangelogPage: '/changelog',
  DocsPage: '/docs',
  FeaturesSection: '/#feature',
  FlickerDesign: 'https://flicker.design',
  ForgotPasswordPage: '/forgot-password',
  HomePage: '/',
  LicensePage: '/license',
  MaintenancePage: '/maintenance',
  Habitool: 'https://habitool.app',
  PartnersPage: '/partners',
  PricingSection: '/#pricing',
  PrivacyPage: '/privacy',
  PixelMint: 'https://pixelmint.studio',
  ResetPasswordPage: '/reset-password',
  RoadmapPage: '/roadmap',
  SignInPage: '/sign-in',
  SignUpPage: '/sign-up',
  SupportPage: '/support',
  TermsPage: '/terms-of-service',
} as const;

export type AppRouteKey = keyof typeof AppRoute;
export type AppRouteValue = (typeof AppRoute)[AppRouteKey];

export const DashboardRoute = {
  OverviewPage: '/dashboard',
  PlaygroundPage: '/dashboard/playground',
  FlowCanvasPage: '/dashboard/playground/flow-canvas',
  ProjectsPage: '/dashboard/projects',
  SettingsPage: '/dashboard/settings',
  BillingPage: '/dashboard/settings/billing',
  APIPage: '/dashboard/settings/api',
  AccountPage: '/dashboard/settings/account',
} as const;

export type DashboardRouteKey = keyof typeof DashboardRoute;
export type DashboardRouteValue = (typeof DashboardRoute)[DashboardRouteKey];
