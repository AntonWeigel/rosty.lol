'use client';

import Image from 'next/image';
import * as React from 'react';

import { List } from '@/components/List';
import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useTabDirection } from '@/components/ui/Tabs/useTabDirection';
import { ListItemType } from '@/constants/enums';
import { useIsMobile } from '@/hooks';
import { LandingSectionsFeatureTabs } from '@/tina/__generated__/types';
import { cn } from '@/utils';

import { FooterLinks } from './FooterLinks';

export const FeatureTabsTemplate: React.FC<LandingSectionsFeatureTabs> = ({
  id,
  header,
  defaultTab,
  tabs,
}) => {
  const isMobile = useIsMobile();
  const { activeTab, direction, handleTabChange } = useTabDirection(
    tabs,
    defaultTab,
  );

  return (
    <TemplateSection id={id} className="gap-8">
      {header && (
        <SectionHeader className="container">
          {header.label && (
            <SectionHeader.Label>{header.label}</SectionHeader.Label>
          )}
          <SectionHeader.Title>{header.title}</SectionHeader.Title>
          {header.subtitle && (
            <SectionHeader.Subtitle>{header.subtitle}</SectionHeader.Subtitle>
          )}
        </SectionHeader>
      )}

      <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
        <TabsList activeTab={activeTab}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <LucideIconRenderer icon={tab.icon} className="size-8" />
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        <div className="bg-secondary-light dark:bg-primary-dark relative z-20 w-screen">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className={cn(
                'data-[state=active]:animate-in data-[state=active]:duration-500',
                isMobile
                  ? 'data-[state=active]:fade-in data-[state=active]:zoom-in-95'
                  : direction === 'left'
                    ? 'data-[state=active]:slide-in-from-right'
                    : 'data-[state=active]:slide-in-from-left',
              )}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
                  <div className="w-full flex-1">
                    <h4 className="text-primary-dark dark:text-primary-light mb-4 text-center text-lg font-semibold sm:text-left">
                      {tab.content.title}
                    </h4>
                    <List>
                      {tab.content.listItems.map((item, idx) => (
                        <List.Item key={idx} type={item.type as ListItemType}>
                          {item.text}
                        </List.Item>
                      ))}
                    </List>
                  </div>
                  <div className="size-full max-w-80 flex-1 overflow-hidden rounded-xl">
                    <Image
                      src={tab.content.image}
                      alt={tab.content.title}
                      width={900}
                      height={600}
                    />
                  </div>
                </div>

                {tab.content.links && <FooterLinks links={tab.content.links} />}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </TemplateSection>
  );
};
