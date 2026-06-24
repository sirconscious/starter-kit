import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
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

export default async function AppSidebar() {
  const { orgSlug } = await auth()

  if (!orgSlug) redirect('/dashboard/org-selection')

  const navItems = [
    { title: 'Dashboard', href: `/dashboard/${orgSlug}`,          icon: LayoutDashboard },
    { title: 'Projects',  href: `/dashboard/${orgSlug}/projects`,  icon: FolderKanban },
    { title: 'Members',   href: `/dashboard/${orgSlug}/members`,   icon: Users },
    { title: 'Billing',   href: `/dashboard/${orgSlug}/billing`,   icon: CreditCard },
    { title: 'Settings',  href: `/dashboard/${orgSlug}/settings`,  icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <OrganizationSwitcher
          hidePersonal={true}
          afterSelectOrganizationUrl="/dashboard/:slug"
          afterCreateOrganizationUrl="/dashboard/:slug"
          afterLeaveOrganizationUrl="/dashboard/org-selection"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.href} />}>
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
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
