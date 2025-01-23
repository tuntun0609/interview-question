'use client'
import React from 'react'
import { PanelLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { useSidebar } from '../ui/sidebar'

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="sm"
      className={cn(className)}
      onClick={event => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span>{open ? '关闭' : '打开'}</span>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'
