import * as React from 'react';

import { CopyButton } from '@/components/CopyButton';
import { DocSectionsCodeBlock } from '@/tina/__generated__/types';
import { generateHighlightedCode } from '@/utils';

export const CodeBlockTemplate: React.FC<DocSectionsCodeBlock> = async ({
  language,
  code,
}) => {
  const out = await generateHighlightedCode(code as string, language);

  return (
    <div className="group relative w-full">
      <CopyButton textToCopy={code as string} />
      <div
        className="selection:bg-accent/40 text-sm selection:text-inherit [&>pre]:max-h-[650px] [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:p-6"
        dangerouslySetInnerHTML={{ __html: out }}
      />
    </div>
  );
};
