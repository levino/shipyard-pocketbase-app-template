import PocketBase from 'pocketbase'
import { describe, expect, it } from 'vitest'

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || 'http://pocketbase-test:8090'

describe('Todos Collection', () => {
  it('should create a todo', async () => {
    const pb = new PocketBase(POCKETBASE_URL)
    await pb
      .collection('_superusers')
      .authWithPassword('admin@test.local', 'testtest123')

    const todo = await pb.collection('todos').create({
      title: 'Test todo',
      completed: false,
      user_id: 'test-user',
    })

    expect(todo.id).toBeDefined()
    expect(todo.title).toBe('Test todo')
    expect(todo.completed).toBe(false)
  })

  it('should toggle a todo', async () => {
    const pb = new PocketBase(POCKETBASE_URL)
    await pb
      .collection('_superusers')
      .authWithPassword('admin@test.local', 'testtest123')

    const todo = await pb.collection('todos').create({
      title: 'Toggle test',
      completed: false,
      user_id: 'test-user',
    })

    const updated = await pb.collection('todos').update(todo.id, {
      completed: true,
    })

    expect(updated.completed).toBe(true)
  })

  it('should delete a todo', async () => {
    const pb = new PocketBase(POCKETBASE_URL)
    await pb
      .collection('_superusers')
      .authWithPassword('admin@test.local', 'testtest123')

    const todo = await pb.collection('todos').create({
      title: 'Delete test',
      completed: false,
      user_id: 'test-user',
    })

    await pb.collection('todos').delete(todo.id)

    await expect(pb.collection('todos').getOne(todo.id)).rejects.toThrow()
  })
})
