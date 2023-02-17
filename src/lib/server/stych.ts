import stytch from 'stytch'
import { STYCH_PROJECT_ID, STYCH_SECRET_KEY } from '$env/static/private'
import { dev } from '$app/environment'

export const client = new stytch.Client({
  project_id: STYCH_PROJECT_ID,
  secret: STYCH_SECRET_KEY,
  env: dev ? stytch.envs.test : stytch.envs.live,
})
