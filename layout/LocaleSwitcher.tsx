'use client';

import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Locale } from '@/i18n/request';
import { GermanyIcon, UnitedStatesIcon } from '@/icons/countries';
import { setUserLocale } from '@/services/locale';

const LOCALE_OPTIONS = [
  { value: 'en', label: 'options.english', flag: UnitedStatesIcon },
  { value: 'de', label: 'options.german', flag: GermanyIcon },
];

export const LocaleSwitcher: React.FC = () => {
  const t = useTranslations('layout.footer.languageSelector');
  const [isPending, startTransition] = React.useTransition();
  const locale = useLocale();

  const handleChange = (locale: Locale) => {
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[136px]" disabled={isPending}>
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        {LOCALE_OPTIONS.map(({ value, label, flag: Flag }) => (
          <SelectItem key={value} value={value}>
            <div className="flex w-full gap-3">
              <Flag />
              <span>{t(label)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
