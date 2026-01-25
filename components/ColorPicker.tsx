import * as React from 'react';
import { HexColorPicker } from 'react-colorful';

import { HexInput } from '@/components/HexInput';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useIsMobile } from '@/hooks';

export type ColorPickerProps = {
  color: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange: (hex: string) => void;
  disabled?: boolean;
  allowShortHex?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  open,
  onOpenChange,
  onChange,
  disabled = false,
  allowShortHex = true,
  children,
  className,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} modal={false}>
        <DrawerTrigger asChild>
          <button type="button" className={className} disabled={disabled}>
            {children}
          </button>
        </DrawerTrigger>
        <DrawerContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-center gap-4 p-4 [&_.react-colorful]:!w-full">
            <HexColorPicker color={color} onChange={onChange} />
            <HexInput
              value={color}
              onChange={onChange}
              allowShort={allowShortHex}
              aria-label="Hex color"
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={className} disabled={disabled}>
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex flex-col items-center gap-4">
          <HexColorPicker color={color} onChange={onChange} />
          <HexInput
            value={color}
            onChange={onChange}
            allowShort={allowShortHex}
            aria-label="Hex color"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
