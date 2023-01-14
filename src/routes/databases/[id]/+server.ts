import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET = (({ params }) => {
  return json({
    id: params.id,
    name: 'Hydrogen',
    user: '2sfsad',
    port: 5432,
    password: 'd4nsim3d',
    hostname: 'db.suncoast.app',
    database: 'hydrogen',
  })
}) satisfies RequestHandler

export const DELETE = (({ params }) => {
  console.log(`TODO: Delete the database with ${params.id}`)
  return new Response('Deleted', { status: 200 })
}) satisfies RequestHandler
