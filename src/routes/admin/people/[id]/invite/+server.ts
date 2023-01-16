import { fail } from '@sveltejs/kit'
import db from '$lib/database'
import type { RequestEvent } from './$types'

export const POST = async ({ params }: RequestEvent) => {
  const person = await db.person.findUnique({ where: { id: params.id } })
  if (!person) return fail(404)

  return new Response('OK', { status: 200 })
}
