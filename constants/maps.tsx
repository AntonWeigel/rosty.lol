import type { Locale } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import type { LucideProps } from 'lucide-react';
import {
  Airplay,
  Blocks,
  BookOpen,
  BookText,
  ChartBar,
  CloudUpload,
  CodeXml,
  Coins,
  Compass,
  Component,
  CreditCard,
  Database,
  Ellipsis,
  FileCode,
  FileText,
  GitPullRequestArrow,
  LaptopMinimal,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Link2,
  Lock,
  Map,
  Monitor,
  Package,
  Palette,
  PanelTop,
  PencilRuler,
  PenTool,
  Play,
  Puzzle,
  RadioTower,
  Rocket,
  Settings2,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  SquareCode,
  SwatchBook,
  Terminal,
  TestTubeDiagonal,
  Undo2,
  Workflow,
  Wrench,
} from 'lucide-react';
import * as React from 'react';

import {
  AppRoute,
  DashboardRoute,
  DashboardRouteValue,
} from '@/constants/routes';
import { G2Award, GoogleAward, ProductHuntAward } from '@/icons/awards';
import {
  CoinbaseLogo,
  DescriptLogo,
  MazeLogo,
  MonzoLogo,
  NetflixLogo,
  UberLogo,
} from '@/icons/companies';
import {
  BetterAuthIcon,
  FlexSearchIcon,
  LemonSqueezyIcon,
  LuciaAuthIcon,
  NextJSIcon,
  OpenAIIcon,
  PolarIcon,
  RadixUIIcon,
  ReactEmailIcon,
  ResendIcon,
  ShadcnUiIcon,
  SupabaseIcon,
  TailwindIcon,
  TinaCMSIcon,
} from '@/icons/libraries';
import { FreePlanIcon, PlusPlanIcon, ProPlanIcon } from '@/icons/plans';
import {
  AppleIcon,
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
} from '@/icons/social';
import {
  GumroadIcon,
  IndieHackersIcon,
  ProductHuntIcon,
  XIcon,
} from '@/icons/testimonialPlatforms';
import { LibraryInfo, SubscriptionPlanFeatures } from '@/types';

import {
  AwardKey,
  BillingCycle,
  CompanyKey,
  LucideIcon,
  SubscriptionPlanName,
  TechStackLibrary,
  TestimonialsPlatform,
} from './enums';

export const ProtectedRoutesMap = {
  Overview: DashboardRoute.OverviewPage,
  ResetPassword: AppRoute.ResetPasswordPage,
} as const;

export const AuthRoutesMap = {
  SignIn: AppRoute.SignInPage,
  SignUp: AppRoute.SignUpPage,
  ForgotPassword: AppRoute.ForgotPasswordPage,
  ResetPassword: AppRoute.ResetPasswordPage,
  Callback: AppRoute.AuthCallbackPage,
} as const;

export const FeatureProtectedRoutesMap: Partial<
  Record<DashboardRouteValue, keyof SubscriptionPlanFeatures>
> = {
  // e.g. [DashboardRoute.BrandingGeneratorPage]: 'brandingGenerator',
};

export const LibraryMap: Record<TechStackLibrary, LibraryInfo> = {
  BetterAuth: {
    icon: BetterAuthIcon,
    text: 'BetterAuth',
    url: 'https://better-auth.com',
  },
  FlexSearch: {
    icon: FlexSearchIcon,
    text: 'FlexSearch',
    url: 'https://www.npmjs.com/package/flexsearch',
  },
  LemonSqueezy: {
    icon: LemonSqueezyIcon,
    text: 'LemonSqueezy',
    url: 'https://lemonsqueezy.com',
  },
  LuciaAuth: {
    icon: LuciaAuthIcon,
    text: 'LuciaAuth',
    url: 'https://lucia-auth.com',
  },
  NextJS: { icon: NextJSIcon, text: 'Next.js', url: 'https://nextjs.org' },
  OpenAI: { icon: OpenAIIcon, text: 'OpenAI', url: 'https://openai.com/api' },
  Polar: {
    icon: PolarIcon,
    text: 'Polar',
    url: 'https://polar.sh',
  },
  RadixUI: { icon: RadixUIIcon, text: 'Radix UI', url: 'https://radix-ui.com' },
  ReactMail: {
    icon: ReactEmailIcon,
    text: 'React Email',
    url: 'https://react.email',
  },
  Resend: { icon: ResendIcon, text: 'Resend', url: 'https://resend.com' },
  ShadcnUi: {
    icon: ShadcnUiIcon,
    text: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
  },
  Supabase: {
    icon: SupabaseIcon,
    text: 'Supabase',
    url: 'https://supabase.io',
  },
  Tailwind: {
    icon: TailwindIcon,
    text: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
  },
  TinaCMS: { icon: TinaCMSIcon, text: 'TinaCMS', url: 'https://tina.io' },
};

export const LucideIconMap: Record<LucideIcon, React.FC<LucideProps>> = {
  Airplay,
  Blocks,
  BookOpen,
  BookText,
  ChartBar,
  CloudUpload,
  CodeXml,
  Coins,
  Compass,
  Component,
  CreditCard,
  Database,
  Ellipsis,
  FileCode,
  FileText,
  GitPullRequestArrow,
  LaptopMinimal,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Link2,
  Map,
  Monitor,
  Package,
  Palette,
  PanelTop,
  PencilRuler,
  PenTool,
  Play,
  Puzzle,
  RadioTower,
  Rocket,
  Settings2,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  SquareCode,
  SwatchBook,
  Terminal,
  TestTubeDiagonal,
  Undo2,
  Workflow,
  Wrench,
};

export const AwardIconMap: Record<AwardKey, React.FC> = {
  g2: G2Award,
  google: GoogleAward,
  ProductHunt: ProductHuntAward,
};

export const CompanyLogoMap: Record<CompanyKey, React.FC> = {
  netflix: NetflixLogo,
  coinbase: CoinbaseLogo,
  uber: UberLogo,
  monzo: MonzoLogo,
  maze: MazeLogo,
  descript: DescriptLogo,
};

export const TestimonialsSourceIconMap: Record<TestimonialsPlatform, React.FC> =
  {
    Gumroad: GumroadIcon,
    IndieHackers: IndieHackersIcon,
    ProductHunt: ProductHuntIcon,
    X: XIcon,
  };

export const LocaleMap: Record<string, Locale> = {
  en: enUS,
  de: de,
};

export const PlanNameMap: Record<SubscriptionPlanName, string> = {
  [SubscriptionPlanName.Free]: 'Free',
  [SubscriptionPlanName.Plus]: 'Plus',
  [SubscriptionPlanName.Pro]: 'Pro',
} as const;

export const BillingCycleMap: Record<BillingCycle, string> = {
  [BillingCycle.Monthly]: 'Monthly',
  [BillingCycle.Yearly]: 'Yearly',
} as const;

export const PlanIconMap: Record<SubscriptionPlanName, React.FC> = {
  [SubscriptionPlanName.Free]: FreePlanIcon,
  [SubscriptionPlanName.Plus]: PlusPlanIcon,
  [SubscriptionPlanName.Pro]: ProPlanIcon,
} as const;

export const SocialProvidersMap = {
  google: <GoogleIcon />,
  facebook: <FacebookIcon />,
  apple: <AppleIcon />,
  github: <GitHubIcon />,
} as const;
