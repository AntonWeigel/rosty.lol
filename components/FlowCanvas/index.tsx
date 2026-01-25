'use client';

import '@xyflow/react/dist/style.css';

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  OnConnect,
  ReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import * as React from 'react';

import { FlowPanel } from '@/components/FlowCanvas/FlowPanel';
import { useIsMobile } from '@/hooks';

import { edgeTypes, initialEdges } from './edges';
import { initialNodes, nodeTypes } from './nodes';

export const FlowCanvas: React.FC = () => {
  const isMobile = useIsMobile();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  const [showControls, setShowControls] = React.useState(false);
  const [showMinimap, setShowMinimap] = React.useState(false);

  const onInit = React.useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  React.useEffect(() => {
    setShowControls(!isMobile);
    setShowMinimap(!isMobile);
  }, [isMobile]);

  const onConnect: OnConnect = React.useCallback(
    (params) => {
      setEdges((edges) => {
        const filteredEdges = edges.filter(
          (e) =>
            !(
              e.target === params.target &&
              e.targetHandle === params.targetHandle
            ),
        );
        return addEdge(
          { type: 'data', data: { key: 'value' }, ...params },
          filteredEdges,
        );
      });
    },
    [setEdges],
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const dropPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const position = {
        x: dropPosition.x - 132 / 2,
        y: dropPosition.y - 110 / 2,
      };

      setNodes((nds) => [
        ...nds,
        {
          id: crypto.randomUUID(),
          type,
          position,
          data: { value: 0 },
        },
      ]);
    },
    [setNodes, reactFlowInstance],
  );

  return (
    <div
      className="size-full"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          panOnScroll={!isMobile}
          panOnDrag={[1, 2]}
          selectionOnDrag={!isMobile}
          selectionMode={SelectionMode.Partial}
          proOptions={{ hideAttribution: true }}
          fitViewOptions={{ minZoom: 0.1, maxZoom: 1 }}
          fitView
        >
          <Background />
          <FlowPanel
            reactFlowInstance={reactFlowInstance}
            setNodesAction={setNodes}
            showControls={showControls}
            setShowControlsAction={setShowControls}
            showMinimap={showMinimap}
            setShowMinimapAction={setShowMinimap}
          />
          {showMinimap && <MiniMap />}
          {showControls && <Controls />}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
