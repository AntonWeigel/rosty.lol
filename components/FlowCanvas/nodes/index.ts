import type { Node, NodeTypes } from '@xyflow/react';

import { NumNode } from './NumNode';
import { ResultNode } from './ResultNode';
import { SumNode } from './SumNode';

export const nodeTypes = {
  num: NumNode,
  sum: SumNode,
  result: ResultNode,
} satisfies NodeTypes;

export const initialNodes: Node[] = [
  { id: 'a', type: 'num', data: { value: 0 }, position: { x: 0, y: 0 } },
  { id: 'b', type: 'num', data: { value: 0 }, position: { x: 0, y: 200 } },
  { id: 'c', type: 'sum', data: { value: 0 }, position: { x: 300, y: 100 } },
  { id: 'd', type: 'num', data: { value: 0 }, position: { x: 0, y: 400 } },
  { id: 'e', type: 'sum', data: { value: 0 }, position: { x: 600, y: 400 } },
  {
    id: 'f',
    type: 'result',
    data: { value: 0 },
    position: { x: 900, y: 400 },
  },
];
