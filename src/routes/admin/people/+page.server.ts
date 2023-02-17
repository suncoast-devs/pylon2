import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import db from '$lib/database'

export const load = (async () => {
  const people = await db.person.findMany({
    select: {
      id: true,
      givenName: true,
      familyName: true,
      email: true,
      userRef: true,
    },
  })
  return { people }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const givenName = data.get('givenName') as string
    const familyName = data.get('familyName') as string
    const email = data.get('email') as string
    const person = await db.person.create({ data: { givenName, familyName, email } })
    return { success: true, person }
  },
}
