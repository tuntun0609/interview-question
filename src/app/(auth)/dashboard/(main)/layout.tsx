import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { CSSProperties } from 'react'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '14rem',
          '--sidebar-width-mobile': '20rem',
        } as CSSProperties
      }
      className="min-h-[calc(100vh-64px)]">
      <DashboardSidebar />
      <main className="min-h-[calc(100vh-64px)] p-2 flex-1">
        <SidebarTrigger className="mb-1" />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  )
}
