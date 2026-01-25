import {
  validateEvent,
  WebhookVerificationError,
} from '@polar-sh/sdk/webhooks';
import { NextRequest, NextResponse } from 'next/server';

import {
  cancelSubscription,
  updateSubscription,
} from '@/services/subscription';

export async function POST(req: NextRequest) {
  try {
    const buf = Buffer.from(await req.arrayBuffer());
    const event = validateEvent(
      buf,
      Object.fromEntries(req.headers),
      process.env.POLAR_WEBHOOK_SECRET ?? '',
    );

    switch (event.type) {
      case 'subscription.created':
      case 'subscription.updated':
        const success = await updateSubscription({
          subscriptionId: event.data.id,
          customerEmail: event.data.customer?.email,
          customerId: event.data.customer?.id,
          status: event.data.status,
          productId: event.data.product?.id,
          currentPeriodStart: event.data.currentPeriodStart,
          currentPeriodEnd: event.data.currentPeriodEnd,
          canceledAt: event.data.canceledAt,
        });

        if (!success) {
          console.error(
            'Failed to process subscription webhook:',
            event.data.id,
          );
          return NextResponse.json(
            { error: 'Failed to process subscription' },
            { status: 500 },
          );
        }
        break;

      case 'subscription.canceled':
        const cancelSuccess = await cancelSubscription({
          subscriptionId: event.data.id,
          canceledAt: event.data.canceledAt,
        });

        if (!cancelSuccess) {
          console.error('Failed to cancel subscription:', event.data.id);
          return NextResponse.json(
            { error: 'Failed to cancel subscription' },
            { status: 500 },
          );
        }
        break;

      case 'order.created':
      case 'order.refunded':
        console.debug('Order event received:', event.type);
        break;

      default:
        console.debug('Unhandled webhook event type:', event.type);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    if (e instanceof WebhookVerificationError) {
      console.error('Webhook verification failed');
      return new NextResponse(null, { status: 403 });
    }

    console.error('Webhook processing failed:', e);
    return new NextResponse(null, { status: 500 });
  }
}
