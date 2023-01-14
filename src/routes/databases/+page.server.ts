import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async () => {
  return {
    databases: [
      { id: 1, name: 'Hydrogen', age: '2 days', size: '2 MB' },
      { id: 2, name: 'Helium', age: '4 weeks', size: '0.5 KB' },
      { id: 3, name: 'Lithium', age: '9 days', size: '24 MB' },
      { id: 4, name: 'Beryllium', age: '30 seconds', size: '224 KB' },
      { id: 5, name: 'Boron', age: '1 year', size: '0B' },
    ],
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name')
    // return fail(400, { name, missing: true })
    return { success: true }
  },
}
