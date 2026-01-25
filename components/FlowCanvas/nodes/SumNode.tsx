import {
  type Node,
  type NodeProps,
  Position,
  useNodeConnections,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import * as React from 'react';

import { DropdownMenuItem } from '@/components/ui/DropdownMenu';

import { BaseNode } from './BaseNode';
import { LabeledHandle } from './LabeledHandle';
import {
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderTitle,
} from './NodeHeader';

export type SumNode = Node<{
  value: number;
}>;

export const SumNode: React.FC<NodeProps<SumNode>> = ({ id }) => {
  const { updateNodeData, setNodes } = useReactFlow();

  const xConnections = useNodeConnections({
    id,
    handleId: 'x',
    handleType: 'target',
  });
  const yConnections = useNodeConnections({
    id,
    handleId: 'y',
    handleType: 'target',
  });

  const x = useStore((state) =>
    getValueFromConnections(xConnections, state.nodeLookup),
  );
  const y = useStore((state) =>
    getValueFromConnections(yConnections, state.nodeLookup),
  );

  const handleDelete = React.useCallback(() => {
    React.startTransition(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    });
  }, [id, setNodes]);

  React.useEffect(() => {
    updateNodeData(id, { value: x + y });
  }, [x, y]);

  return (
    <BaseNode>
      <NodeHeader>
        <NodeHeaderTitle>Sum</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Open node menu">
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </NodeHeaderMenuAction>
        </NodeHeaderActions>
      </NodeHeader>
      <footer className="bg-accent text-primary-light -mx-2 -mb-2">
        <LabeledHandle
          id="x"
          title="x"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle
          id="y"
          title="y"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
};

function getValueFromConnections(
  connections: ReturnType<typeof useNodeConnections>,
  lookup: Map<string, Node<any>>,
): number {
  return connections.reduce((acc, connection) => {
    const node = lookup.get(connection.source);
    const value = node?.data?.value;
    return typeof value === 'number' ? acc + value : acc;
  }, 0);
}
