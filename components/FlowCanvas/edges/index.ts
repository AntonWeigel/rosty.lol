import type { Edge, EdgeTypes } from '@xyflow/react';

import { DataEdge } from './DataEdge';

export const edgeTypes = {
  data: DataEdge,
} satisfies EdgeTypes;

export const initialEdges: Edge[] = [
  {
    id: 'a->c',
    type: 'data',
    data: { key: 'value' },
    source: 'a',
    target: 'c',
    targetHandle: 'x',
  },
  {
    id: 'b->c',
    type: 'data',
    data: { key: 'value' },
    source: 'b',
    target: 'c',
    targetHandle: 'y',
  },
  {
    id: 'c->e',
    type: 'data',
    data: { key: 'value' },
    source: 'c',
    target: 'e',
    targetHandle: 'x',
  },
  {
    id: 'd->e',
    type: 'data',
    data: { key: 'value' },
    source: 'd',
    target: 'e',
    targetHandle: 'y',
  },
  {
    id: 'e->f',
    type: 'data',
    data: { key: 'value' },
    source: 'e',
    target: 'f',
    targetHandle: 'x',
  },
];
