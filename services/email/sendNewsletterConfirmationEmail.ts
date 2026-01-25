import resend from '@/config/resend';
import NewsletterConfirmationEmail from '@/emails/newsletterConfirmation';

/**
 * Sends a newsletter subscription confirmation email via Resend.
 *
 * @param email - Recipient email address.
 * @returns The Resend API response.
 */
export async function sendNewsletterConfirmationEmail(email: string) {
  try {
    return await resend.emails.send({
      from: `aSaaSin <${process.env.RESEND_NOTIFICATION_EMAIL}>`,
      to: email,
      subject: 'You’re subscribed to the aSaaSin newsletter!',
      react: NewsletterConfirmationEmail({ email }),
    });
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    throw new Error('Failed to send the newsletter confirmation email');
  }
}
