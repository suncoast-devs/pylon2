import { fail } from '@sveltejs/kit'
import db from '$lib/database'
import type { RequestEvent } from './$types'
import { invite } from '$lib/server/people/invite'

// TODO: Error handling
export const POST = async ({ params }: RequestEvent) => {
  const person = await db.person.findUnique({ where: { id: params.id } })
  if (!person) return fail(404)

  const userRef = await invite(person.givenName, person.familyName, person.email)
  if (!userRef) return fail(500)

  await db.person.update({ where: { id: params.id }, data: { userRef } })

  return new Response('OK', { status: 200 })
}
