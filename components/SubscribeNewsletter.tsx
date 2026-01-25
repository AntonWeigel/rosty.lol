'use client';

import { Loader } from 'lucide-react';
import * as React from 'react';

import { newsletterSubscribeAction } from '@/app/actions';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks';

export const SubscribeNewsletter: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.set('email', email);

      const res = await newsletterSubscribeAction(formData);

      if (res.success) {
        toast({
          title: 'Subscribed!',
          description: 'You’ve been subscribed to the newsletter.',
          variant: 'success',
        });
        setEmail('');
      } else {
        toast({
          title: 'Subscription failed',
          description: res.error ?? 'Something went wrong.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <section
      id="newsletter"
      className="flex flex-col items-center justify-center gap-8"
    >
      <SectionHeader>
        <SectionHeader.Label>Newsletter</SectionHeader.Label>
        <SectionHeader.Title>Level up your SaaS game</SectionHeader.Title>
        <SectionHeader.Subtitle>
          I share smart techniques, motivation, and SaaS startup insights.
        </SectionHeader.Subtitle>
      </SectionHeader>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col items-center justify-center gap-6 sm:flex-row"
      >
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          variant="secondary"
          className="max-w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
            </>
          )}
        </Button>
      </form>
    </section>
  );
};
