import * as React from 'react';

import {
  BillingCycle,
  ChangelogTag,
  ListItemType,
  LucideIcon,
  RoadmapCategory,
  RoadmapStatus,
} from '@/constants/enums';
import { Post, Scalars } from '@/tina/__generated__/types';

export type LibraryInfo = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  url: string;
};

export type ContentOption = {
  label: string;
  value: string;
};

export type PostPreview = Pick<
  Post,
  'thumbnail' | 'title' | 'author' | 'description' | 'category' | 'createdAt'
> & { slug: string };

export type NavItem = {
  title: string;
  url: string;
  items: NavItem[];
  root: boolean;
  order: number;
  icon?: LucideIcon;
  isActive?: boolean;
};

export type FlatNavItem = Pick<NavItem, 'title' | 'url'>;

export type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: SidebarItem[];
};

export type DocIndexData = {
  id: string;
  title: string;
  content: string;
  url: string;
  icon: LucideIcon;
};

export type SearchResult = {
  url: string;
  title: string;
  icon: LucideIcon;
  matches: string[];
};

export type EnrichedSearchResultUnit = {
  field: string;
  result: {
    id: string;
    doc: DocIndexData;
  }[];
};

export type UserProfile = {
  email: string;
  name?: string;
  avatar?: string;
};

export type Project = {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
};

export type ApiToken = {
  id: string;
  name: string;
  publicToken: string;
  createdAt: string;
};

export type SubscriptionPlanBenefit = { text: string; type?: ListItemType };

export type SubscriptionPlanFeatures = {
  maxApiRequests?: number | null;
  maxProjects?: number | null;
  maxApiTokens?: number | null;
  brandingGenerator?: boolean;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  billingCycle: BillingCycle;
  price: number;
  badge?: string;
  thumbnail?: string;
  checkoutNote?: string;
  productId?: string;
  benefits?: SubscriptionPlanBenefit[];
  features: SubscriptionPlanFeatures;
  current?: boolean;
};

export type Subscription = {
  id: string;
  userId: string;
  subscriptionPlanId: string;
  subscriptionId?: string | null;
  customerId?: string | null;
  status: 'active' | 'canceled' | 'past_due' | 'expired';
  createdAt: string;
  expiredAt?: string | null;
};

export type DashboardSidebarData = {
  userProfile: UserProfile | null;
  subscriptionPlans: SubscriptionPlan[];
  projects: Project[];
  currentPlan: SubscriptionPlan | null;
};

export type CheckoutSuccessData = {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: string;
  products: Array<{
    name: string;
    description: string;
  }>;
};

export type ChangelogEntry = {
  version: string;
  title: string;
  description: Scalars['JSON']['output'];
  createdAt: string;
  tags: ChangelogTag[];
};

export type RoadmapEntry = {
  title: string;
  slug: string;
  description: Scalars['JSON']['output'];
  createdAt: string;
  status: RoadmapStatus;
  category: RoadmapCategory;
  votes: number;
};

export type GroupedRoadmapEntry = {
  status: RoadmapStatus;
  items: RoadmapEntry[];
};

export type BreadcrumbEntry = {
  title: string;
  url: string;
  isLast: boolean;
};

export type ActionResponse<T = undefined> = {
  success: boolean;
  error?: string;
  data?: T;
};

export type ActionMessage =
  | { success: string; product_id?: string }
  | { error: string; product_id?: string }
  | { message: string; product_id?: string };
