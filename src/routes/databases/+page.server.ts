import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import db from '$lib/database'

export const load = (async ({ depends }) => {
  depends('app:databases')
  const databases = await db.database.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  })
  return { databases }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name') as string
    // TODO: Validate name better
    if (name === null) return fail(400, { name, missing: true })
    const database = await db.database.create({ data: { name } })
    return { success: true, database }
  },
}
