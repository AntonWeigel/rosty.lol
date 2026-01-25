import * as React from 'react';

import {
  AboutTemplate,
  ContrastTemplate,
  CtaTemplate,
  DemoVideoTemplate,
  FaqTemplate,
  FeatureCardsTemplate,
  FeatureGridTemplate,
  FeatureTabsTemplate,
  HeroTemplate,
  KeyMetricsTemplate,
  PainPointsTemplate,
  ProductTemplate,
  ShowcaseTemplate,
  SocialProofTemplate,
  StackFormulaTemplate,
  SubscriptionTemplate,
  TestimonialsGridTemplate,
  TestimonialsTemplate,
} from '@/components/SectionTemplates';
import { LandingSections, Maybe } from '@/tina/__generated__/types';
import { SubscriptionPlan } from '@/types';

export const LandingPageSections: React.FC<{
  sections?: Maybe<Maybe<LandingSections>[]>;
  subscriptionPlans: SubscriptionPlan[];
}> = ({ sections, subscriptionPlans }) => {
  if (!sections) return null;

  const renderSection = (section: Maybe<LandingSections>, index: number) => {
    if (!section) return null;

    const key = `${index}-${section.__typename}`;

    switch (section.__typename) {
      case 'LandingSectionsAbout':
        return <AboutTemplate key={key} {...section} />;
      case 'LandingSectionsContrast':
        return <ContrastTemplate key={key} {...section} />;
      case 'LandingSectionsCta':
        return <CtaTemplate key={key} {...section} />;
      case 'LandingSectionsDemoVideo':
        return <DemoVideoTemplate key={key} {...section} />;
      case 'LandingSectionsFaq':
        return <FaqTemplate key={key} {...section} />;
      case 'LandingSectionsFeatureCards':
        return <FeatureCardsTemplate key={key} {...section} />;
      case 'LandingSectionsFeatureGrid':
        return <FeatureGridTemplate key={key} {...section} />;
      case 'LandingSectionsFeatureTabs':
        return <FeatureTabsTemplate key={key} {...section} />;
      case 'LandingSectionsHero':
        return <HeroTemplate key={key} {...section} />;
      case 'LandingSectionsKeyMetrics':
        return <KeyMetricsTemplate key={key} {...section} />;
      case 'LandingSectionsPainPoints':
        return <PainPointsTemplate key={key} {...section} />;
      case 'LandingSectionsProduct':
        return <ProductTemplate key={key} {...section} />;
      case 'LandingSectionsShowcase':
        return <ShowcaseTemplate key={key} {...section} />;
      case 'LandingSectionsSocialProof':
        return <SocialProofTemplate key={key} {...section} />;
      case 'LandingSectionsStackFormula':
        return <StackFormulaTemplate key={key} {...section} />;
      case 'LandingSectionsSubscription':
        return (
          <SubscriptionTemplate
            key={key}
            {...section}
            subscriptionPlans={subscriptionPlans}
          />
        );
      case 'LandingSectionsTestimonials':
        return <TestimonialsTemplate key={key} {...section} />;
      case 'LandingSectionsTestimonialsGrid':
        return <TestimonialsGridTemplate key={key} {...section} />;
      default:
        console.log(`Template ${section.__typename} is not implemented.`);
        return null;
    }
  };

  return <>{sections.map(renderSection)}</>;
};
