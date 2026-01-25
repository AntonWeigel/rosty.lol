import { Metadata } from 'next';

import { DeleteAccountForm } from '@/components/DeleteAccountForm';
import { UpdateUserProfileForm } from '@/components/UpdateUserProfileForm';
import { fetchUserProfile } from '@/services/user';

export const metadata: Metadata = {
  title: 'Account Settings',
  description:
    'Update your personal details and account preferences in the demo dashboard.',
};

export default async function Page() {
  const userProfile = await fetchUserProfile();

  return (
    <div className="flex flex-wrap justify-center gap-10 md:justify-start">
      <UpdateUserProfileForm initialUserProfile={userProfile} />
      <DeleteAccountForm />
    </div>
  );
}
