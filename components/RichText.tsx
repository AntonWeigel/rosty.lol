import Link from 'next/link';
import * as React from 'react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

import { Code } from '@/components/ui/Code';
import { cn } from '@/utils';

type TinaLinkProps = { url: string; children: React.ReactNode };

type TinaContentProps = {
  children?: React.ReactNode;
};

export const RichText: React.FC<{
  content: TinaMarkdownContent | TinaMarkdownContent[];
  className?: string;
}> = ({ content, className }) => (
  <div
    className={cn(
      'text-secondary-dark dark:text-neutral flex flex-col gap-6 break-words',
      className,
    )}
  >
    <TinaMarkdown
      content={content}
      components={{
        a: (props?: TinaLinkProps) => (
          <Link
            href={props?.url || ''}
            className="hover:text-highlight underline"
          >
            {props?.children}
          </Link>
        ),
        p: (props?: TinaContentProps) => (
          <p {...props} className="m-0 leading-relaxed" />
        ),
        ol: (props?: TinaContentProps) => (
          <ol {...props} className="m-0 list-decimal pl-5" />
        ),
        ul: (props?: TinaContentProps) => (
          <ul {...props} className="m-0 list-disc pl-5" />
        ),
        li: (props?: TinaContentProps) => (
          <li
            {...props}
            className="marker:text-accent mb-2.5 pl-1 [&>div]:mb-2.5"
          />
        ),
        code: (props?: TinaContentProps) => <Code {...props} />,
      }}
    />
  </div>
);
