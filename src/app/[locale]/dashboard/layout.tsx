import { UserButton } from '@clerk/nextjs'
import { FileQuestion, Tags } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { LocaleSwitch } from '@/components/blocks/locale-switch'
import ThemeToggle from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { checkRole } from '@/lib/roles'

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) => {
  if (!(await checkRole('admin'))) {
    redirect('/')
  }

  const { locale } = await params

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="px-4 py-3 text-lg font-semibold">管理面板</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>内容管理</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`/${locale}/dashboard/questions`}>
                      <FileQuestion className="h-4 w-4" />
                      <span>题目列表</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`/${locale}/dashboard/tags`}>
                      <Tags className="h-4 w-4" />
                      <span>管理标签</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">面试题管理系统</h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleSwitch />
            <UserButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
