import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  CreditCard,
  Users,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { title: 'Team', href: '/dashboard/team', icon: Users },
  { title: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { title: 'Pricing', href: '/pricing', icon: CreditCard },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default async function AppSidebar() {
  const user = await currentUser()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="text-xl font-bold">SaaSKit</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton disabled>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-3">
          <UserButton />
          <div>
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
