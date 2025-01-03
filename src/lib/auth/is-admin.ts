import { User } from '@clerk/nextjs/server'

export const isAdmin = (user?: User | null) => {
  return user?.emailAddresses[0]?.emailAddress === process.env.ADMIN_EMAIL
}
