import 'dotenv/config';

import { createAdminClient } from '@/config/supabase/adminClient';
import { StorageBucket } from '@/constants/enums';

const supabase = createAdminClient();

// Define all buckets your app needs here
const bucketsToCreate: { name: StorageBucket; public: boolean }[] = [
  { name: StorageBucket.Avatars, public: true },
];

/**
 * Ensures the given bucket exists in Supabase storage.
 */
async function ensureBucketExists(bucketName: string, publicAccess: boolean) {
  const { data: existingBuckets, error: listError } =
    await supabase.storage.listBuckets();
  if (listError)
    throw new Error(`Failed to list buckets: ${listError.message}`);

  const existing = existingBuckets.find((b) => b.name === bucketName);

  if (existing) {
    const visibility = existing.public ? 'public' : 'private';
    console.log(`Bucket "${bucketName}" already exists (${visibility})`);

    if (existing.public !== publicAccess) {
      console.warn(
        `Expected "${bucketName}" to be ${publicAccess ? 'public' : 'private'}, but it is ${visibility}. Supabase does not support updating bucket visibility after creation.`,
      );
    }

    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    bucketName,
    {
      public: publicAccess,
    },
  );

  if (createError)
    throw new Error(
      `Failed to create bucket "${bucketName}": ${createError.message}`,
    );

  console.log(
    `Bucket "${bucketName}" created (${publicAccess ? 'public' : 'private'})`,
  );
}

async function run() {
  try {
    for (const { name, public: isPublic } of bucketsToCreate) {
      await ensureBucketExists(name, isPublic);
    }

    console.log('All required buckets are ready.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to initialize storage:', err);
    process.exit(1);
  }
}

run();
