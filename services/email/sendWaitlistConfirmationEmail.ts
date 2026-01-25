import resend from '@/config/resend';
import WaitlistConfirmationEmail from '@/emails/waitlistConfirmation';

/**
 * Sends a waitlist confirmation email via Resend.
 *
 * @param email - Recipient email address.
 * @returns The Resend API response.
 */
export async function sendWaitlistConfirmationEmail(email: string) {
  try {
    return await resend.emails.send({
      from: `aSaaSin <${process.env.RESEND_NOTIFICATION_EMAIL}>`,
      to: email,
      subject: 'Join Waitlist',
      react: WaitlistConfirmationEmail({ email }),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send the email');
  }
}
