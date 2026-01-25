// '@/components/ui/HexInput.tsx'
'use client';

import * as React from 'react';

import { Input, type InputProps } from '@/components/ui/Input';
import { cn } from '@/utils';

export type HexInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (hex: string) => void;
  allowShort?: boolean;
  showSwatch?: boolean;
  onRawChange?: (raw: string) => void;
};

const normalize = (v: string) =>
  (v.startsWith('#') ? v : `#${v}`).toUpperCase();

const isValidHex = (v: string, allowShort: boolean) =>
  allowShort
    ? /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(v)
    : /^#[0-9A-F]{6}$/i.test(v);

export const HexInput = ({
  value,
  onChange,
  onRawChange,
  allowShort = true,
  showSwatch = true,
  className,
  ...props
}: HexInputProps) => {
  const [text, setText] = React.useState(normalize(value));
  const [invalid, setInvalid] = React.useState(false);

  React.useEffect(() => {
    const next = normalize(value);
    if (next !== text) setText(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (raw: string) => {
    const cleaned = '#' + raw.replace(/^#/, '').replace(/[^0-9a-fA-F]/g, '');
    const upper = cleaned.toUpperCase().slice(0, 7);
    setText(upper);
    onRawChange?.(upper);

    const ok = isValidHex(upper, allowShort);
    setInvalid(!ok);
    if (ok) onChange(upper);
  };

  const swatchColor = isValidHex(text, allowShort) ? text : 'transparent';

  return (
    <div className="relative inline-flex items-center">
      <Input
        aria-label="Hex color"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => {
          if (!isValidHex(text, allowShort)) {
            setText(normalize(value));
            setInvalid(false);
          }
        }}
        maxLength={7}
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        invalid={invalid}
        className={cn('w-28 pr-10 text-center font-mono text-xs', className)}
        {...props}
      />

      {showSwatch && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-1/2 right-2 -translate-y-1/2',
            'h-5 w-5 rounded-md border shadow-xs',
            'border-secondary-dark/20 dark:border-secondary-light/20',
          )}
          style={{ backgroundColor: swatchColor }}
        />
      )}
    </div>
  );
};
