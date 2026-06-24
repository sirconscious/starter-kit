import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import {
  Users,
  FolderKanban,
  Activity,
  ArrowUpRight,
  UserPlus,
  CreditCard,
  Settings,
  Zap,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card'

const activityItems = [
  {
    icon: Users,
    text: 'New member joined "Engineering"',
    time: '2 hours ago',
    color: 'text-blue-500',
  },
  {
    icon: FolderKanban,
    text: 'Project "Q3 Launch" was created',
    time: '5 hours ago',
    color: 'text-orange-500',
  },
  {
    icon: Settings,
    text: 'Organization settings updated',
    time: '1 day ago',
    color: 'text-purple-500',
  },
  {
    icon: Activity,
    text: 'Deployment completed successfully',
    time: '2 days ago',
    color: 'text-green-500',
  },
]

export default async function OrgDashboardPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgId } = await auth()
  const user = await currentUser()
  const { orgSlug: slug } = await params

  const client = await clerkClient()
  const organization = await client.organizations.getOrganization({
    organizationId: orgId!,
  })
  const { totalCount: memberCount } =
    await client.organizations.getOrganizationMembershipList({
      organizationId: orgId!,
      limit: 1,
    })

  const statCards = [
    {
      title: 'Total Members',
      value: memberCount,
      icon: Users,
      description: 'Active members',
    },
    {
      title: 'Active Projects',
      value: '0',
      icon: FolderKanban,
      description: 'No DB yet — placeholder',
    },
    {
      title: 'API Calls',
      value: '—',
      icon: Activity,
      description: 'Today',
    },
    {
      title: 'Uptime',
      value: '99.9%',
      icon: ArrowUpRight,
      description: 'Last 30 days',
    },
  ]

  const quickActions = [
    {
      title: 'Invite Members',
      description: 'Add people to your organization',
      icon: UserPlus,
      href: `/dashboard/${slug}/members`,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Manage Billing',
      description: 'View plans and invoices',
      icon: CreditCard,
      href: `/dashboard/${slug}/billing`,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Settings',
      description: 'Configure organization settings',
      icon: Settings,
      href: `/dashboard/${slug}/settings`,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Integrations',
      description: 'Connect your tools',
      icon: Zap,
      href: '#',
      color: 'bg-green-100 text-green-600',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with{' '}
          <strong>{organization.name}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <CardAction>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg ${action.color}`}
                      >
                        <action.icon className="size-5" />
                      </div>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <Card>
            <CardContent className="divide-y">
              {activityItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-3 py-3 ${i === 0 ? 'pt-0' : ''} ${i === activityItems.length - 1 ? 'pb-0' : ''}`}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <item.icon className={`size-4 ${item.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
