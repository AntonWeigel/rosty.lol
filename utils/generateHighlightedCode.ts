import { codeToHtml } from 'shiki';

import { HexColors } from '@/constants/colors';

/**
 * Generates syntax-highlighted HTML from source code using Shiki.
 * Replaces default background colors with custom theme colors.
 *
 * @param code - The source code to highlight.
 * @param language - The programming language of the code block.
 * @returns A Promise resolving to a highlighted HTML string.
 */
export async function generateHighlightedCode(
  code: string,
  language: string,
): Promise<string> {
  return codeToHtml(code, {
    lang: language,
    themes: {
      light: 'everforest-light',
      dark: 'vitesse-dark',
    },
    colorReplacements: {
      'everforest-light': {
        '#fdf6e3': HexColors['secondary-light'],
      },
      'vitesse-dark': {
        '#121212': HexColors['primary-dark'],
      },
    },
  });
}
