import { ComponentVariant } from '@/constants/enums';

import { extractContentPreview } from './extractContentPreview';

/**
 * Generates a human-readable label for a CMS section, including emojis and content previews.
 *
 * @param section - A section object from TinaCMS or similar with `_template` and other content fields.
 * @returns A formatted string label representing the section type and its preview content.
 */
export function getSectionLabel(section: Record<string, any>): string {
  switch (section._template) {
    case 'text': {
      const contentPreview = extractContentPreview(section.content);
      return contentPreview
        ? `💬 Text Section (${contentPreview}...)`
        : '💬 Text Section';
    }

    case 'header':
      let variantEmoji = '';
      switch (section.variant) {
        case ComponentVariant.Primary:
          variantEmoji = '🥇';
          break;
        case ComponentVariant.Secondary:
          variantEmoji = '🥈';
          break;
      }
      return section.text
        ? `🎓${variantEmoji} Header Section (${section.text})`
        : `🎓${variantEmoji} Header Section`;

    case 'image':
      return section.alt
        ? `🌁 Image Section (${section.alt})`
        : '🌁 Image Section';

    case 'codeBlock':
      return section.code
        ? `🖥️ Code Block (${section.code.trim().split(' ').slice(0, 15).join(' ') || ''}...)`
        : '🖥️ Code Block';

    case 'infoBlock': {
      const infoPreview = extractContentPreview(section.content);
      return infoPreview
        ? `ℹ️ Info Block (${infoPreview}...)`
        : 'ℹ️ Info Block';
    }

    default:
      return `${section.__typename}`;
  }
}
