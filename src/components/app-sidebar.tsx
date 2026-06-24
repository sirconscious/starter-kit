import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { OrganizationSwitcher } from '@clerk/nextjs'
import Link from 'next/link'
import {
  LayoutDashboard,
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
import { SettingsNavItem } from '@/components/settings-nav-item'
import { SidebarCollapseButton } from '@/components/sidebar-collapse-button'

export default async function AppSidebar() {
  const { orgSlug } = await auth()

  if (!orgSlug) redirect('/org-selection')

  const navItems = [
    { title: 'Dashboard', href: `/dashboard/${orgSlug}`,          icon: LayoutDashboard },
    { title: 'Members',   href: `/dashboard/${orgSlug}/members`,   icon: Users },
    { title: 'Billing',   href: `/dashboard/${orgSlug}/billing`,   icon: CreditCard },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-3">
        <OrganizationSwitcher
          hidePersonal={true}
          afterSelectOrganizationUrl="/dashboard/:slug"
          afterCreateOrganizationUrl="/dashboard/:slug"
          afterLeaveOrganizationUrl="/org-selection"
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
              <SettingsNavItem orgSlug={orgSlug} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  )
}
