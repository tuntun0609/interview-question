import { auth } from '@clerk/nextjs/server'

import { Roles } from '@/type'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}
