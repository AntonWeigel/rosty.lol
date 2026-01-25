import {
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from '@xyflow/react';
import * as React from 'react';

import { BaseNode } from '@/components/FlowCanvas/nodes/BaseNode';
import { LabeledHandle } from '@/components/FlowCanvas/nodes/LabeledHandle';
import {
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderTitle,
} from '@/components/FlowCanvas/nodes/NodeHeader';
import { Button } from '@/components/ui/Button';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Separator } from '@/components/ui/Separator';

export type NumNode = Node<{
  value: number;
}>;

export const NumNode: React.FC<NodeProps<NumNode>> = ({ id, data }) => {
  const { updateNodeData, setNodes } = useReactFlow();

  const handleReset = React.useCallback(() => {
    updateNodeData(id, { value: 0 });
  }, [id, updateNodeData]);

  const handleDelete = React.useCallback(() => {
    React.startTransition(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    });
  }, [id, setNodes]);

  const handleIncr = React.useCallback(() => {
    updateNodeData(id, { value: data.value + 1 });
  }, [id, data.value, updateNodeData]);

  const handleDecr = React.useCallback(() => {
    updateNodeData(id, { value: data.value - 1 });
  }, [id, data.value, updateNodeData]);

  return (
    <BaseNode>
      <NodeHeader>
        <NodeHeaderTitle>Num</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Open node menu">
            <DropdownMenuItem onSelect={handleReset}>Reset</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
          </NodeHeaderMenuAction>
        </NodeHeaderActions>
      </NodeHeader>
      <Separator />
      <div className="mt-2 mb-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="md"
          className="nodrag"
          onClick={handleDecr}
        >
          -
        </Button>
        <pre>{String(data.value).padStart(3, ' ')}</pre>
        <Button
          variant="outline"
          size="md"
          className="nodrag"
          onClick={handleIncr}
        >
          +
        </Button>
      </div>

      <footer className="bg-accent text-primary-light -m-2">
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
};
