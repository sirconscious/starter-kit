'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Settings, User, Building, ChevronDown } from 'lucide-react'
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function SettingsNavItem({ orgSlug }: { orgSlug: string }) {
  const [open, setOpen] = useState(true)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => setOpen(!open)}>
        <Settings className="size-4" />
        <span>Settings</span>
        <ChevronDown
          className={`ml-auto size-4 transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </SidebarMenuButton>
      {open && (
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              render={<Link href={`/dashboard/${orgSlug}/settings/user`} />}
            >
              <User className="size-4" />
              <span>User Settings</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              render={
                <Link href={`/dashboard/${orgSlug}/settings/organization`} />
              }
            >
              <Building className="size-4" />
              <span>Org Settings</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}
