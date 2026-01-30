'use client';

import { Document } from 'flexsearch';
import * as React from 'react';

import { DocIndexData, EnrichedSearchResultUnit, SearchResult } from '@/types';
import { extractSearchSnippets } from '@/utils';

const DEFAULT_CONTEXT_VALUE = {
  search: () => [],
};

const DocsSearchContext = React.createContext<{
  search: (query: string) => SearchResult[];
}>(DEFAULT_CONTEXT_VALUE);

type DocsSearchProviderProps = {
  children: React.ReactNode;
  indexData: DocIndexData[];
};

export const DocsSearchProvider: React.FC<DocsSearchProviderProps> = ({
  children,
  indexData,
}) => {
  const [index, setIndex] = React.useState<Document<
    DocIndexData
  > | null>(null);

  React.useEffect(() => {
    const newIndex = new Document<DocIndexData>({
      tokenize: 'forward',
      document: {
        id: 'id',
        index: ['title', 'content'],
        store: ['title', 'icon', 'url', 'content'],
      },
    });

    // Add each document from indexData to the FlexSearch index
    indexData.forEach((doc) => newIndex.add(doc));
    setIndex(newIndex);
  }, [indexData]);

  const search = (query: string): SearchResult[] => {
    if (!index) return [];

    const fieldMatches = index.search(query, {
      enrich: true,
    }) as unknown as EnrichedSearchResultUnit[];

    const groupedResults: { [key: string]: SearchResult } = {};

    fieldMatches.forEach((fieldMatch) => {
      // Only process matches for the 'content' field
      if (fieldMatch.field !== 'content') return;

      fieldMatch.result.forEach((documentMatch) => {
        const doc = documentMatch.doc;
        if (!doc) return;

        const matches = extractSearchSnippets(doc.content, query);

        if (!groupedResults[documentMatch.id]) {
          groupedResults[documentMatch.id] = {
            url: doc.url,
            title: doc.title,
            icon: doc.icon,
            matches: [],
          };
        }

        groupedResults[documentMatch.id].matches.push(...matches);
      });
    });

    return Object.values(groupedResults);
  };

  return (
    <DocsSearchContext.Provider value={{ search }}>
      {children}
    </DocsSearchContext.Provider>
  );
};

export const useDocsSearch = () => {
  const context = React.useContext(DocsSearchContext);
  if (!context) {
    throw new Error('useDocsSearch must be used within a DocsSearchProvider');
  }
  return context;
};
