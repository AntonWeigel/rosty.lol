import { AppRoute } from '@/constants/routes';

export const SITE = {
  name: 'Demo Starter',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  locale: 'en_US',
  contacts: { email: 'mailto:hello@demo.dev' },
  author: { name: 'John Doe', avatar: '/default-author.webp' },

  navigation: [
    { label: 'Pricing', href: AppRoute.PricingSection },
    { label: 'Blog', href: AppRoute.BlogPage },
    { label: 'Docs', href: AppRoute.DocsPage },
  ],

  footer: {
    links: [
      { label: 'Pricing', href: AppRoute.PricingSection },
      { label: 'Blog', href: AppRoute.BlogPage },
      { label: 'Changelog', href: AppRoute.ChangelogPage },
      { label: 'Roadmap', href: AppRoute.RoadmapPage },
    ],
    legal: [
      { label: 'Terms of services', href: AppRoute.TermsPage },
      { label: 'Privacy policy', href: AppRoute.PrivacyPage },
      { label: 'License', href: AppRoute.LicensePage },
    ],
    more: [
      { label: 'FlickerDesign', href: AppRoute.FlickerDesign },
      { label: 'Habitool', href: AppRoute.Habitool },
      { label: 'PixelMint', href: AppRoute.PixelMint },
    ],
  },
} as const;

export type SiteConfig = typeof SITE;
