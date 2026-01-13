import type { APIRoute } from 'astro'
import { getPocketBase } from '@/lib/pocketbase'

export const POST: APIRoute = async ({ params, redirect }) => {
  const { id } = params

  if (!id) {
    return redirect('/?error=missing-id')
  }

  try {
    const pb = getPocketBase()
    await pb.collection('todos').delete(id)
  } catch {
    return redirect('/?error=delete-failed')
  }

  return redirect('/')
}
