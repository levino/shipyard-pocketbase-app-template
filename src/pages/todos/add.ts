import type { APIRoute } from 'astro'
import { getPocketBase } from '@/lib/pocketbase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const title = formData.get('title')

  if (!title || typeof title !== 'string') {
    return redirect('/?error=missing-title')
  }

  // For demo purposes, use a fixed user_id (in production, get from auth)
  const userId = 'demo-user'

  try {
    const pb = getPocketBase()
    await pb.collection('todos').create({
      title,
      completed: false,
      user_id: userId,
    })
  } catch {
    return redirect('/?error=create-failed')
  }

  return redirect('/')
}
