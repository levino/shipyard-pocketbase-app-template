import type { APIRoute } from 'astro'
import { getPocketBase } from '@/lib/pocketbase'

export const POST: APIRoute = async ({ params, redirect }) => {
  const { id } = params

  if (!id) {
    return redirect('/?error=missing-id')
  }

  try {
    const pb = getPocketBase()
    const todo = await pb.collection('todos').getOne(id)
    await pb.collection('todos').update(id, {
      completed: !todo.completed,
    })
  } catch {
    return redirect('/?error=toggle-failed')
  }

  return redirect('/')
}
