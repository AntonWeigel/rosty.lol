import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  Node,
  Position,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils';

export type DataEdge<T extends Node = Node> = Edge<{
  /**
   * The key to lookup in the source node's `data` object. For additional safety,
   * you can parameterize the `DataEdge` over the type of one of your nodes to
   * constrain the possible values of this key.
   *
   * If no key is provided this edge behaves identically to React Flow's default
   * edge component.
   */
  key?: keyof T['data'];
  /**
   * Which of React Flow's path algorithms to use. Each value corresponds to one
   * of React Flow's built-in edge types.
   *
   * If not provided, this defaults to `"bezier"`.
   */
  path?: 'bezier' | 'smoothstep' | 'step' | 'straight';
}>;

export const DataEdge: React.FC<EdgeProps<DataEdge>> = ({
  data = { path: 'bezier' },
  id,
  markerEnd,
  source,
  sourcePosition,
  sourceX,
  sourceY,
  style,
  targetPosition,
  targetX,
  targetY,
}) => {
  const { setEdges } = useReactFlow();
  const nodeData = useStore((state) => state.nodeLookup.get(source)?.data);
  const [edgePath, labelX, labelY] = getPath({
    type: data.path ?? 'bezier',
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const label = React.useMemo(() => {
    if (data.key && nodeData) {
      const value = nodeData[data.key];

      switch (typeof value) {
        case 'string':
        case 'number':
          return value;

        case 'object':
          return JSON.stringify(value);

        default:
          return '';
      }
    }
  }, [data, nodeData]);

  const transform = `translate(${labelX}px,${labelY}px) translate(-50%, -50%)`;

  const handleDelete = () => {
    setEdges((edges) => edges.filter((e) => e.id !== id));
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {data.key && (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'group hover:border-destructive/50 dark:border-neutral/50 border-secondary-dark/20 dark:bg-secondary-dark absolute flex items-center justify-center rounded-sm border px-1 transition-all',
            )}
            style={{ transform, pointerEvents: 'all' }}
          >
            {/* Default value label */}
            <span className="text-xs transition-opacity group-hover:opacity-0">
              {label}
            </span>

            {/* Delete button shown on hover */}
            <button
              onClick={handleDelete}
              className="text-destructive absolute inset-0 flex items-center justify-center text-xs opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="size-2.5" />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

/**
 * Chooses which of React Flow's edge path algorithms to use based on the provided
 * `type`.
 */
function getPath({
  type,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: {
  type: 'bezier' | 'smoothstep' | 'step' | 'straight';
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}) {
  switch (type) {
    case 'bezier':
      return getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      });

    case 'smoothstep':
      return getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      });

    case 'step':
      return getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 0,
      });

    case 'straight':
      return getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
  }
}
