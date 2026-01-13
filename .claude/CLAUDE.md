# Project Rules

## Test-Driven Development (TDD)

**No code changes without a failing test!**

1. First write a test that fails
2. Then change the code to make the test pass
3. Refactor only when tests are green

This applies to all bug fixes and new features.

## PocketBase Database Schema Changes

**Never write migration SQL by hand!**

When you need to alter the database schema (create/update/delete collections), use the `/create-collection` skill or follow this process:

1. Write a temporary JavaScript file that uses `pb.collections.create()` (or `.update()` / `.delete()`)
2. Run it with `node <file>.js`
3. PocketBase automatically generates the migration file in `pocketbase/pb_migrations/`
4. Delete the temporary file
5. Commit the generated migration

### Example

```javascript
// temp-collection.js
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://<CONTAINER_IP>:8090')
await pb.collection('_superusers').authWithPassword('admin@test.local', 'testtest123')

await pb.collections.create({
  name: 'my_collection',
  type: 'base',
  fields: [
    { name: 'title', type: 'text', required: true },
  ],
})

console.log('Done!')
```

Then: `node temp-collection.js && rm temp-collection.js`

### Why This Approach

- PocketBase generates correct internal IDs
- Proper migration format with rollback functions
- No risk of SQL errors from manual migrations
- Type-safe field definitions

## PocketBase Testing

**Never mock PocketBase!**

- Tests run against real PocketBase instance (pocketbase-test in Docker Compose)
- No `vi.mock('pocketbase')` or similar
- Integration tests ensure real-world behavior

## Development Workflow

```bash
# Start PocketBase
docker compose up -d pocketbase-dev

# Get container IP for scripts
docker network inspect shipyard-pocketbase-template_default --format '{{range .Containers}}{{.IPv4Address}}{{end}}'

# Start dev server
npm run dev:bare

# Run tests
npm run test:bare
```
