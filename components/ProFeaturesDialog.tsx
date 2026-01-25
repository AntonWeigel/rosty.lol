'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { List } from '@/components/List';
import { SectionLabel } from '@/components/SectionHeader/SectionLabel';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { DashboardRoute } from '@/constants/routes';

export const ProFeaturesDialog: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(DashboardRoute.BillingPage);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Pro Features</DialogTitle>
          <div className="flex flex-col gap-y-2">
            <SectionLabel>Upgrade to Pro</SectionLabel>
            <div className="flex flex-col gap-y-6">
              <h2 className="text-primary-dark dark:text-primary-light text-3xl font-medium">
                Unlock Your Full Potential
              </h2>
              <p className="text-secondary-dark dark:text-neutral m-0 font-medium">
                Get access to powerful features designed to accelerate your SaaS
                growth and streamline your workflow.
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Get access to powerful features designed to accelerate your SaaS
          growth and streamline your workflow.
        </DialogDescription>

        <List>
          <List.Item type="accent">
            Access premium SaaS building blocks
          </List.Item>
          <List.Item type="accent">
            Priority support & feature requests
          </List.Item>
          <List.Item type="accent">
            Advanced branding and customization tools
          </List.Item>
        </List>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClick}>See Plans</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
