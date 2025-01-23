import { CSSProperties } from 'react'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { SidebarTrigger } from '@/components/sidebar-trigger'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '14rem',
          '--sidebar-width-mobile': '20rem',
        } as CSSProperties
      }
      className="min-h-[calc(100vh-64px)]"
    >
      <DashboardSidebar />
      <main className="min-h-[calc(100vh-64px)] flex-1 p-2">
        <SidebarTrigger className="mb-1" />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  )
}
