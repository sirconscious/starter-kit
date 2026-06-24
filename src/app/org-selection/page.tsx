import { OrganizationList } from '@clerk/nextjs'

export default function OrgSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <OrganizationList
        hidePersonal={true}
        afterSelectOrganizationUrl="/dashboard/:slug"
        afterCreateOrganizationUrl="/dashboard/:slug"
      />
    </div>
  )
}
