import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import db from '$lib/database'

export const load = (async () => {
  const people = await db.person.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
  return { people }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name') as string
    const email = data.get('email') as string
    const person = await db.person.create({ data: { name, email } })
    return { success: true, person }
  },
}
