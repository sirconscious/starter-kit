import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, UserPlus, XCircle } from 'lucide-react'

const ROLE_LABELS: Record<string, string> = {
  'org:admin': 'Admin',
  'org:member': 'Member',
}

const ROLE_VARIANTS: Record<string, 'default' | 'outline'> = {
  'org:admin': 'default',
  'org:member': 'outline',
}

async function inviteMember(formData: FormData) {
  'use server'

  const { userId, orgId, has } = await auth()
  if (!userId || !orgId) throw new Error('Not authenticated')
  if (!has({ role: 'org:admin' })) {
    throw new Error('Not authorized')
  }

  const email = formData.get('email') as string
  const role = formData.get('role') as string

  if (!email || !role) throw new Error('Email and role are required')

  const clerk = await clerkClient()
  await clerk.organizations.createOrganizationInvitation({
    organizationId: orgId,
    inviterUserId: userId,
    emailAddress: email,
    role,
  })

  revalidatePath('/dashboard/[orgSlug]/members')
}

async function revokeInvitation(formData: FormData) {
  'use server'

  const { userId, orgId, has } = await auth()
  if (!userId || !orgId) throw new Error('Not authenticated')
  if (!has({ role: 'org:admin' })) {
    throw new Error('Not authorized')
  }

  const invitationId = formData.get('invitationId') as string
  if (!invitationId) throw new Error('Invitation ID required')

  const clerk = await clerkClient()
  await clerk.organizations.revokeOrganizationInvitation({
    organizationId: orgId,
    invitationId,
    requestingUserId: userId,
  })

  revalidatePath('/dashboard/[orgSlug]/members')
}

async function removeMember(formData: FormData) {
  'use server'

  const { userId, orgId, has } = await auth()
  if (!userId || !orgId) throw new Error('Not authenticated')
  if (!has({ role: 'org:admin' })) {
    throw new Error('Not authorized')
  }

  const memberUserId = formData.get('userId') as string
  if (!memberUserId) throw new Error('User ID required')

  const clerk = await clerkClient()
  await clerk.organizations.deleteOrganizationMembership({
    organizationId: orgId,
    userId: memberUserId,
  })

  revalidatePath('/dashboard/[orgSlug]/members')
}

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const first = firstName?.charAt(0) ?? ''
  const last = lastName?.charAt(0) ?? ''
  return (first + last).toUpperCase() || '?'
}

function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
): string {
  if (firstName && lastName) return `${firstName} ${lastName}`
  if (firstName) return firstName
  if (lastName) return lastName
  return 'Unknown'
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>
}) {
  const { orgSlug: slug } = await params
  const { orgId, userId, has } = await auth()

  if (!orgId || !userId) {
    return <p>You must be signed in to view this page.</p>
  }

  const clerk = await clerkClient()

  const [membersResponse, invitesResponse] = await Promise.all([
    clerk.organizations.getOrganizationMembershipList({
      organizationId: orgId,
      limit: 100,
    }),
    clerk.organizations.getOrganizationInvitationList({
      organizationId: orgId,
      status: ['pending'],
      limit: 50,
    }),
  ])

  const members = membersResponse.data
  const invitations = invitesResponse.data
  const isAdmin = has({ role: 'org:admin' })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Members</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organization&apos;s members and send invitations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {members.map((member) => {
              const userData = member.publicUserData
              const name = getDisplayName(
                userData?.firstName,
                userData?.lastName,
              )
              const email = userData?.identifier ?? ''
              const initials = getInitials(
                userData?.firstName,
                userData?.lastName,
              )

              return (
                <div
                  key={member.id}
                  className="flex items-center gap-3 px-(--card-spacing) py-3"
                >
                  <Avatar>
                    <AvatarImage
                      src={userData?.imageUrl}
                      alt={name}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{name}</p>
                    {email && (
                      <p className="truncate text-xs text-muted-foreground">
                        {email}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        ROLE_VARIANTS[member.role] ?? 'outline'
                      }
                    >
                      {ROLE_LABELS[member.role] ?? member.role}
                    </Badge>
                    {isAdmin && userData?.userId !== userId && (
                      <form action={removeMember}>
                        <input
                          type="hidden"
                          name="userId"
                          value={userData?.userId}
                        />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon-xs"
                          title="Remove member"
                        >
                          <XCircle className="size-3.5" />
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              )
            })}
            {members.length === 0 && (
              <div className="px-(--card-spacing) py-8 text-center text-sm text-muted-foreground">
                No members yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isAdmin && invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Pending Invitations ({invitations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center gap-3 px-(--card-spacing) py-3"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <Mail className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {invitation.emailAddress}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sent {formatDate(invitation.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Pending</Badge>
                    <Badge
                      variant={
                        ROLE_VARIANTS[invitation.role] ?? 'outline'
                      }
                    >
                      {ROLE_LABELS[invitation.role] ?? invitation.role}
                    </Badge>
                    <form action={revokeInvitation}>
                      <input
                        type="hidden"
                        name="invitationId"
                        value={invitation.id}
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon-xs"
                        title="Revoke invitation"
                      >
                        <XCircle className="size-3.5" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Invite Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={inviteMember}
              className="flex flex-wrap items-end gap-3"
            >
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="colleague@company.com"
                  required
                />
              </div>
              <div className="min-w-0">
                <label
                  htmlFor="role"
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="org:member">Member</option>
                  <option value="org:admin">Admin</option>
                </select>
              </div>
              <Button type="submit">
                <UserPlus className="size-4" />
                Send Invite
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
