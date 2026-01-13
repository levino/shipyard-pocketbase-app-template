import PocketBase from 'pocketbase'
import { beforeEach } from 'vitest'

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || 'http://pocketbase-test:8090'

beforeEach(async () => {
  const pb = new PocketBase(POCKETBASE_URL)

  await pb
    .collection('_superusers')
    .authWithPassword('admin@test.local', 'testtest123')

  // Clear todos before each test
  try {
    const records = await pb.collection('todos').getFullList()
    for (const record of records) {
      await pb.collection('todos').delete(record.id)
    }
  } catch {
    // Collection might not exist yet
  }
})
