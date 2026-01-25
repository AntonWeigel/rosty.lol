import { Slot } from '@radix-ui/react-slot';
import { useNodeId, useReactFlow } from '@xyflow/react';
import { EllipsisVertical, Trash } from 'lucide-react';
import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/utils';

export type NodeHeaderProps = React.HTMLAttributes<HTMLElement>;

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
  <header
    className={cn('flex items-center justify-between gap-2', className)}
    {...props}
  />
);

export type NodeHeaderTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  asChild?: boolean;
};

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const NodeHeaderTitle = ({
  className,
  asChild,
  ...props
}: NodeHeaderTitleProps) => {
  const Comp = asChild ? Slot : 'h3';

  return (
    <Comp className={cn(className, 'user-select-none flex-1')} {...props} />
  );
};

export type NodeHeaderIconProps = React.HTMLAttributes<HTMLSpanElement>;

export const NodeHeaderIcon = ({
  className,
  ...props
}: NodeHeaderIconProps) => (
  <span className={cn(className, '[&>*]:size-5')} {...props} />
);

export type NodeHeaderActionsProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * A container for right-aligned action buttons in the node header.
 */
export const NodeHeaderActions = ({
  className,
  ...props
}: NodeHeaderActionsProps) => (
  <div
    className={cn(
      'ml-auto flex items-center gap-1 justify-self-end',
      className,
    )}
    {...props}
  />
);

export type NodeHeaderActionProps = ButtonProps & {
  label: string;
};

/**
 * A thin wrapper around the `<Button />` component with a fixed sized suitable
 * for icons.
 *
 * Because the `<NodeHeaderAction />` component is intended to render icons, it's
 * important to provide a meaningful and accessible `label` prop that describes
 * the action.
 */
export const NodeHeaderAction = ({
  className,
  label,
  title,
  ...props
}: NodeHeaderActionProps) => (
  <Button
    variant="ghost"
    aria-label={label}
    title={title ?? label}
    className={cn(className, 'nodrag size-6 p-1')}
    {...props}
  />
);

export type NodeHeaderMenuActionProps = Omit<
  NodeHeaderActionProps,
  'onClick'
> & {
  trigger?: React.ReactNode;
};

/**
 * Renders a header action that opens a dropdown menu when clicked. The dropdown
 * trigger is a button with an ellipsis icon. The trigger's content can be changed
 * by using the `trigger` prop.
 *
 * Any children passed to the `<NodeHeaderMenuAction />` component will be rendered
 * inside the dropdown menu. You can read the docs for the shadcn dropdown menu
 * here: https://ui.shadcn.com/docs/components/dropdown-menu
 *
 */
export const NodeHeaderMenuAction = ({
  trigger,
  children,
  ...props
}: NodeHeaderMenuActionProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <NodeHeaderAction {...props}>
        {trigger ?? <EllipsisVertical />}
      </NodeHeaderAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent>{children}</DropdownMenuContent>
  </DropdownMenu>
);

export const NodeHeaderDeleteAction = () => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = React.useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node">
      <Trash />
    </NodeHeaderAction>
  );
};
