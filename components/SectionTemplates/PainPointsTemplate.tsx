import { ArrowDown } from 'lucide-react';
import * as React from 'react';
import type { Components } from 'tinacms/dist/rich-text';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

import { TemplateSection } from '@/components/TemplateSection';
import { RainyCloudsIcon } from '@/icons';
import { LandingSectionsPainPoints } from '@/tina/__generated__/types';
import { cn } from '@/utils';

const components: Components<{
  highlight: { text?: string };
}> = {
  highlight: ({ text }) => (
    <span className="text-destructive font-medium">{text}</span>
  ),
};

export const PainPointsTemplate: React.FC<LandingSectionsPainPoints> = ({
  id,
  animation,
  lines,
  link,
}) => (
  <TemplateSection id={id} animation={animation} className="my-16 gap-16">
    <div className="flex flex-col items-center gap-12 text-center">
      <div className="bg-destructive/20 w-full max-w-xl rounded-2xl p-6 leading-relaxed shadow-md sm:p-8">
        <ul className="flex list-none flex-col items-center gap-3 p-0 text-left">
          {lines?.map((item, i) => {
            if (!item?.body) return null;

            const isFirst = i === 0;
            const isLast = i === lines.length - 1;

            return (
              <li
                key={i}
                className={cn(
                  'text-secondary-dark dark:text-secondary-light flex w-full sm:justify-center',
                  isLast &&
                    'text-primary-dark dark:text-primary-light mt-4 text-center font-semibold',
                )}
              >
                <span className="mr-1">
                  {isFirst ? '' : isLast ? '=' : '+'}
                </span>

                <TinaMarkdown content={item.body} components={components} />

                {isLast && (
                  <span className="ml-2">
                    <RainyCloudsIcon />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {link?.label && link?.href && (
        <a href={link.href} className="flex items-center gap-2">
          <ArrowDown size={16} />
          {link.label}
        </a>
      )}
    </div>
  </TemplateSection>
);
