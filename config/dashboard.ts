import { LucideIcon } from '@/constants/enums';
import { AppRoute, DashboardRoute } from '@/constants/routes';

const config = {
  platform: [
    {
      title: 'Overview',
      url: DashboardRoute.OverviewPage,
      icon: LucideIcon.Airplay,
    },
    {
      title: 'Playground',
      url: DashboardRoute.PlaygroundPage,
      icon: LucideIcon.Terminal,
      items: [
        {
          title: 'Flow Canvas',
          url: DashboardRoute.FlowCanvasPage,
        },
      ],
    },
    {
      title: 'Projects',
      url: DashboardRoute.ProjectsPage,
      icon: LucideIcon.Layers,
    },
    {
      title: 'Settings',
      url: DashboardRoute.SettingsPage,
      icon: LucideIcon.Settings2,
      items: [
        {
          title: 'Account',
          url: DashboardRoute.AccountPage,
        },
        {
          title: 'Billing',
          url: DashboardRoute.BillingPage,
        },
        {
          title: 'API',
          url: DashboardRoute.APIPage,
        },
      ],
    },
  ],
  resources: [
    {
      title: 'Documentation',
      url: AppRoute.DocsPage,
      icon: LucideIcon.BookOpen,
    },
    {
      title: 'Changelog',
      url: AppRoute.ChangelogPage,
      icon: LucideIcon.GitPullRequestArrow,
    },
    {
      title: 'Roadmap',
      url: AppRoute.RoadmapPage,
      icon: LucideIcon.Map,
    },
  ],
};

export default config;
