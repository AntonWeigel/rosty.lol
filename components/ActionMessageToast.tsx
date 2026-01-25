'use client';

import * as React from 'react';

import { useToast } from '@/hooks';
import { ActionMessage } from '@/types';

type ActionMessageToastType = { message: ActionMessage };

export const ActionMessageToast: React.FC<ActionMessageToastType> = ({
  message,
}) => {
  const { toast } = useToast();

  React.useEffect(() => {
    if ('error' in message) {
      toast({
        title: 'Login failed',
        description: message.error,
        variant: 'destructive',
      });
    }
    if ('success' in message) {
      toast({
        title: 'Success',
        description: message.success,
        variant: 'success',
      });
    }
    if ('message' in message) {
      toast({ title: 'Notice', description: message.message });
    }
  }, [message, toast]);

  return null;
};
