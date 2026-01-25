'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { updateSubscriptionAction } from '@/app/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { SubscriptionPlanName } from '@/constants/enums';
import { BillingCycleMap, PlanNameMap } from '@/constants/maps';
import { useToast } from '@/hooks';
import { SubscriptionPlan } from '@/types';
import { getPlanIcon } from '@/utils';

type PlanSwitcherProps = {
  plans: SubscriptionPlan[];
  currentPlan: SubscriptionPlan;
};

export const PlanSwitcher: React.FC<PlanSwitcherProps> = ({
  plans,
  currentPlan,
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const CurrentPlanIcon = getPlanIcon(currentPlan.name);

  const handlePlanChange = async (plan: SubscriptionPlan) => {
    if (plan.id === currentPlan.id) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.set('name', plan.name);
      formData.set('billing_cycle', plan.billingCycle);
      const result = await updateSubscriptionAction(formData);

      if (!result.success || !result.data?.redirectUrl) {
        toast({
          title: 'Error updating subscription',
          description:
            result.error || 'Something went wrong, Please try again.',
          variant: 'destructive',
        });
        return;
      }

      window.location.href = result.data.redirectUrl;
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <CurrentPlanIcon />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {PlanNameMap[currentPlan.name as SubscriptionPlanName]}
                </span>
                <span className="truncate text-xs">
                  {BillingCycleMap[currentPlan.billingCycle]}
                </span>
              </div>
              <CaretSortIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-primary-light/50 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl backdrop-blur-md"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {plans.map((plan, index) => {
              const PlanItemIcon = getPlanIcon(plan.name);
              const isCurrent = plan.id === currentPlan.id;

              return (
                <DropdownMenuItem
                  key={plan.name}
                  onClick={() => handlePlanChange(plan)}
                  disabled={isCurrent || isPending}
                  className="group gap-3 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-xs border">
                    <PlanItemIcon className="group-hover:stroke-highlight shrink-0" />
                  </div>
                  {PlanNameMap[plan.name as SubscriptionPlanName]}
                  {isCurrent ? (
                    <div className="ml-auto">
                      <CheckIcon className="size-4" />
                    </div>
                  ) : (
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
