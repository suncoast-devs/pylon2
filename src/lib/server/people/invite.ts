import { client as stytch } from '$lib/server/stych'

export async function invite(givenName: string, familyName: string, email: string): Promise<string | undefined> {
  const invitation = await stytch.magicLinks.email.invite({
    email,
    name: {
      first_name: givenName,
      last_name: familyName,
    },
  })

  if (invitation.status_code === 200) {
    return invitation.user_id
  }
}
