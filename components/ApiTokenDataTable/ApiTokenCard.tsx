'use client';

import { Check, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks';

type ApiTokenCardProps = {
  token: string;
  onDismiss?: () => void;
};

export const ApiTokenCard: React.FC<ApiTokenCardProps> = ({
  token,
  onDismiss,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Your API token has been copied successfully.',
        variant: 'success',
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="bg-secondary-light dark:bg-primary-dark relative flex flex-col items-center justify-between gap-4 rounded-xl p-4 pt-10 md:flex-row">
      <div className="flex flex-col gap-2 text-center text-xs md:text-left">
        <div className="text-success flex w-full items-center justify-center gap-2 md:justify-start">
          <Check className="size-4" />
          <span>Successfully generated a new token!</span>
        </div>
        <p>
          Do copy this access token and store it in a secure place - you will
          not be able to see it again.
        </p>
      </div>

      <div className="relative flex w-full max-w-sm items-center gap-2">
        <Input
          value={token}
          readOnly
          className="bg-primary-light/50 dark:bg-secondary-dark/50 truncate pr-16 font-mono text-xs"
        />
        <Button
          onClick={handleCopy}
          className="bg-accent text-primary-light hover:bg-accent/80 absolute right-2 h-7 rounded-lg px-2.5 text-xs"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-secondary-dark dark:text-secondary-light absolute top-2 right-2 p-1 opacity-50 transition-opacity duration-300 hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};
