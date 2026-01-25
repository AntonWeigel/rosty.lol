import resend from '@/config/resend';

/**
 * Adds a contact to the Resend audience.
 *
 * @param email - The user's email address to add.
 * @throws If the contact could not be added.
 */
export async function addContactToAudience(email: string): Promise<void> {
  try {
    await resend.contacts.create({
      email,
      firstName: 'Joined',
      lastName: 'User',
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });
  } catch (error) {
    console.error('Error adding contact to audience:', error);
    throw new Error('Failed to add contact to the audience');
  }
}
