import { isAdmin } from '@/lib/auth/is-admin'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!isAdmin(user))
    return <div>You are not authorized to access this page</div>

  return <div>{children}</div>
}