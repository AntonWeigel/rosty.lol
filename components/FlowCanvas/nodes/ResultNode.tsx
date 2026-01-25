import {
  Edge,
  InternalNode,
  Node,
  NodeProps,
  Position,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { NodeLookup } from '@xyflow/system';
import * as React from 'react';

import { BaseNode } from '@/components/FlowCanvas/nodes/BaseNode';
import { LabeledHandle } from '@/components/FlowCanvas/nodes/LabeledHandle';
import {
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderTitle,
} from '@/components/FlowCanvas/nodes/NodeHeader';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Separator } from '@/components/ui/Separator';

export type ResultNode = Node<{
  value: number;
}>;

export const ResultNode: React.FC<NodeProps<ResultNode>> = ({ id }) => {
  const { setNodes } = useReactFlow();

  const value = useStore((state) =>
    getHandleValue(id, state.edges, state.nodeLookup),
  );

  const handleDelete = React.useCallback(() => {
    React.startTransition(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    });
  }, [id, setNodes]);

  return (
    <BaseNode>
      <NodeHeader>
        <NodeHeaderTitle>Result</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Open node menu">
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </NodeHeaderMenuAction>
        </NodeHeaderActions>
      </NodeHeader>
      <Separator />
      <div className="mt-2 mb-4 text-center font-bold">{value}</div>
      <footer className="bg-accent text-primary-light -m-2">
        <LabeledHandle
          title="x"
          id="x"
          type="target"
          position={Position.Left}
        />
      </footer>
    </BaseNode>
  );
};

function getHandleValue(
  nodeId: string,
  edges: Edge[],
  nodeLookup: NodeLookup<InternalNode>,
): number {
  const incomingEdge = edges.find(
    (e) => e.target === nodeId && e.targetHandle === 'x',
  );

  const sourceNode = nodeLookup.get(incomingEdge?.source ?? '');
  const edgeKey = (incomingEdge?.data?.key ?? 'value') as string;

  const value = sourceNode?.data?.[edgeKey];

  return typeof value === 'number' ? value : 0;
}
