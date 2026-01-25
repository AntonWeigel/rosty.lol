import fs from 'fs';
import path from 'path';

import client from '@/tina/__generated__/client';

import { DOCS_SEARCH_INDEX } from '../constants';
import { LucideIcon } from '../constants/enums';
import { DocIndexData } from '../types';

// Function to extract plain text from TinaCMS content nodes
function extractPlainText(contentNode: any): string {
  if (typeof contentNode === 'string') {
    return contentNode;
  }
  if (Array.isArray(contentNode.children)) {
    return contentNode.children.map(extractPlainText).join(' ');
  }
  return contentNode.text || '';
}

// Fetch and structure data in the required format
async function fetchData(): Promise<DocIndexData[]> {
  const docsListData = await client.queries.docConnection();

  return (
    docsListData?.data?.docConnection?.edges?.map((edge) => {
      const node = edge?.node;
      const content = node?.sections
        ?.map((section) => {
          switch (section?.__typename) {
            case 'DocSectionsHeader':
              return section.text;
            case 'DocSectionsText':
              return extractPlainText(section.content || '');
            case 'DocSectionsCodeBlock':
              return extractPlainText(section.code || '');
            case 'DocSectionsInfoBlock':
              return extractPlainText(section.content || '');
            default:
              return '';
          }
        })
        .filter(Boolean)
        .join(' ');

      return {
        id: node?.id as string,
        icon: (node?.icon || LucideIcon.BookOpen) as LucideIcon,
        title: node?.title || '',
        content: content || '',
        url: `/docs/${node?._sys.breadcrumbs.join('/')}`,
      };
    }) || []
  );
}

// Function to create the search index JSON file
async function createIndex() {
  const data = await fetchData();
  console.log('Fetched data for search index:', data);

  const outputPath = path.join(process.cwd(), 'public', DOCS_SEARCH_INDEX);

  // Write data directly to the JSON file
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Search index JSON created at: ${outputPath}`);
}

// Run the mock index creation function
createIndex().catch(console.error);
