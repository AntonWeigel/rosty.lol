'use client';

import * as React from 'react';

import { joinWaitlistAction } from '@/app/actions';
import { GetAccessButton } from '@/components/GetAccessButton';
import { List } from '@/components/List';
import { SectionLabel } from '@/components/SectionHeader/SectionLabel';
import { TransitionButton } from '@/components/TransitionButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks';
import {
  LandingSectionsCtaCtaButtonWaitlistLabel,
  LandingSectionsHeroCtaButtonWaitlistLabel,
  LandingSectionsProductProductsCheckoutButtonWaitlistLabel,
} from '@/tina/__generated__/types';

type JoinWaitlistDialogProps = {
  label:
    | LandingSectionsHeroCtaButtonWaitlistLabel
    | LandingSectionsCtaCtaButtonWaitlistLabel
    | LandingSectionsProductProductsCheckoutButtonWaitlistLabel;
};

export const JoinWaitlistDialog: React.FC<JoinWaitlistDialogProps> = ({
  label,
}) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);

      const result = await joinWaitlistAction(formData);

      if (result.success) {
        setOpen(false);
        toast({
          title: 'Success',
          description: 'You’ve successfully joined the waitlist!',
          variant: 'success',
          duration: 5000,
        });
        setEmail('');
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <GetAccessButton
          onClick={() => setOpen(true)}
          label={label}
          isPending={false}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Join Watchlist</DialogTitle>
          <div className="flex flex-col gap-y-2">
            <SectionLabel>Join Waitlist</SectionLabel>
            <div className="flex flex-col gap-y-6">
              <h2 className="text-primary-dark dark:text-primary-light text-3xl font-medium">
                Unlock Exclusive SaaS Growth Hacks
              </h2>
              <p className="text-secondary-dark dark:text-neutral m-0 font-medium">
                Join now to receive insider tips on finding startup ideas,
                launching fast, and achieving profitability
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Enter your email below to join the waitlist and gain exclusive
          insights on SaaS growth.
        </DialogDescription>

        <List>
          <List.Item type="accent">
            Boost your marketing game with expert tips
          </List.Item>
          <List.Item type="accent">
            Generate compelling sales texts using AI-powered prompts
          </List.Item>
        </List>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-6 text-center"
        >
          <div className="flex w-full flex-col justify-center gap-6 sm:flex-row">
            <Input
              type="email"
              placeholder="Your email…"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TransitionButton
              type="submit"
              pendingText="Joining..."
              isPending={isPending}
            >
              Join Waitlist
            </TransitionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
