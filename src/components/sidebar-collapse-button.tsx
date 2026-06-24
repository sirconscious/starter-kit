'use client'

import { ChevronsLeft } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export function SidebarCollapseButton() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className="w-full justify-start gap-2"
    >
      <ChevronsLeft className="size-4" />
      <span>collapse</span>
    </Button>
  )
}
