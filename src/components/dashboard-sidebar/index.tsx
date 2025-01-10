import { FileText, Home, User } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: '仪表盘首页',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: '文章管理',
    url: '/dashboard/posts',
    icon: FileText,
  },
  {
    title: '用户管理',
    url: '/dashboard/users',
    icon: User,
  },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="h-[calc(100vh-64px)] top-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>后台</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
