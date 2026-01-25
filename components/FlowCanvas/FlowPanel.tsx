'use client';

import { Panel, ReactFlowInstance } from '@xyflow/react';
import {
  Equal,
  GitBranchPlus,
  GitFork,
  MapIcon,
  SlidersHorizontal,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Toggle } from '@/components/ui/Toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

type NodeType = 'num' | 'sum' | 'result';

const nodeIcons: Record<NodeType, React.ReactNode> = {
  num: <GitBranchPlus className="size-4" />,
  sum: <GitFork className="size-4" />,
  result: <Equal className="size-4" />,
};

const nodeLabels: Record<NodeType, string> = {
  num: 'Num',
  sum: 'Sum',
  result: 'Result',
};

type FlowPanelProps = {
  reactFlowInstance: ReactFlowInstance | null;
  setNodesAction: React.Dispatch<React.SetStateAction<any[]>>;
  showControls: boolean;
  setShowControlsAction: React.Dispatch<React.SetStateAction<boolean>>;
  showMinimap: boolean;
  setShowMinimapAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FlowPanel: React.FC<FlowPanelProps> = ({
  reactFlowInstance,
  setNodesAction,
  showControls,
  setShowControlsAction,
  showMinimap,
  setShowMinimapAction,
}) => {
  const handleDragStart = (type: NodeType) => (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = (type: NodeType) => () => {
    if (!reactFlowInstance) return;

    const nodes = reactFlowInstance.getNodes();

    const furthestNode = nodes.reduce(
      (acc, node) => (node.position.x > acc.position.x ? node : acc),
      { position: { x: 0, y: 100 } },
    );

    const newX = furthestNode.position.x + 200;
    const newY = furthestNode.position.y;

    const id = crypto.randomUUID();

    const newNode = {
      id,
      type,
      position: { x: newX, y: newY },
      data: { value: 0 },
    };

    setNodesAction((nds) => [...nds, newNode]);

    // Scroll into view after the node is mounted
    setTimeout(() => {
      reactFlowInstance.setCenter(newX + 64, newY + 48, {
        zoom: 1.2,
        duration: 800,
      });
    }, 0);
  };

  return (
    <Panel
      position="top-right"
      className="bg-secondary-light dark:bg-primary-dark flex flex-col gap-2 rounded-md p-2 shadow-md"
    >
      {(Object.keys(nodeLabels) as NodeType[]).map((type) => (
        <Tooltip key={type} delayDuration={1000}>
          <TooltipTrigger asChild>
            <Button
              key={type}
              variant="ghost"
              draggable
              onDragStart={handleDragStart(type)}
              onClick={handleClick(type)}
              className="hover:bg-highlight/10 flex size-8 items-center rounded-md px-1.5"
            >
              {nodeIcons[type]}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{nodeLabels[type]}</TooltipContent>
        </Tooltip>
      ))}

      <Separator />

      {/* Toggle: Minimap */}
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              variant="default"
              size="md"
              pressed={showMinimap}
              onPressedChange={setShowMinimapAction}
            >
              <MapIcon className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>Toggle Minimap</TooltipContent>
      </Tooltip>

      {/* Toggle: Controls */}
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              variant="default"
              size="md"
              pressed={showControls}
              onPressedChange={setShowControlsAction}
            >
              <SlidersHorizontal className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>Toggle Controls</TooltipContent>
      </Tooltip>
    </Panel>
  );
};
