/**
 * Extracts a text preview from rich-text nodes or plain string content.
 *
 * @param content - The input content, either as a rich-text node tree or a plain string.
 * @param wordLimit - The maximum number of words to include in the preview (default: 15).
 * @returns A trimmed text preview limited to the specified number of words.
 */
export function extractContentPreview(content: any, wordLimit = 15): string {
  let text = '';

  // Extract text from rich-text (object format)
  const extractTextFromNodes = (node: any) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'text' && node.text) {
      text += node.text + ' ';
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => extractTextFromNodes(child));
    }
  };

  // If content is rich-text (object-based), process it
  if (content && typeof content === 'object') {
    extractTextFromNodes(content);
  }

  // If content is a string (e.g., code), use it directly
  if (typeof content === 'string') {
    text = content;
  }

  // Trim the text and limit the number of words
  return text.trim().split(' ').slice(0, wordLimit).join(' ') || '';
}
