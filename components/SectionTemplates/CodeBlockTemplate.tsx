'use client';

import * as React from 'react';

import { CopyButton } from '@/components/CopyButton';
import { DocSectionsCodeBlock } from '@/tina/__generated__/types';
import { generateHighlightedCode } from '@/utils';

export const CodeBlockTemplate: React.FC<DocSectionsCodeBlock> = ({
  language,
  code,
}) => {
  const [highlightedHtml, setHighlightedHtml] = React.useState<string>('');

  React.useEffect(() => {
    if (code && language) {
      generateHighlightedCode(code as string, language).then(
        setHighlightedHtml,
      );
    }
  }, [code, language]);

  return (
    <div className="group relative w-full">
      <CopyButton textToCopy={code as string} />
      <div
        className="selection:bg-accent/40 text-sm selection:text-inherit [&>pre]:max-h-[650px] [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:p-6"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
};
