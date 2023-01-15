import { json, fail } from '@sveltejs/kit'
import db from '$lib/database'
import type { RequestEvent } from './$types'

export const GET = async ({ params }: RequestEvent) => {
  const database = await db.database.findUnique({ where: { id: params.id } })
  if (!database) return fail(404)
  return json(database)
}

export const DELETE = async ({ params }: RequestEvent) => {
  const database = await db.database.delete({ where: { id: params.id } })
  if (!database) return fail(404)
  return new Response('Deleted', { status: 200 })
}
