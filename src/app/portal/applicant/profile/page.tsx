import { auth } from "@/auth";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { findUserById, getUserOrganisationName } from "@/lib/auth/store";

export default async function ProfilePage() {
  const session = await auth();
  const user = await findUserById(session!.user.id);
  const organisationName = await getUserOrganisationName(session!.user.id);

  return (
    <div className="max-w-md px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Profile</h1>
      <form className="mt-6 flex flex-col gap-5">
        <FormField label="Organisation name" htmlFor="org">
          <Input id="org" defaultValue={organisationName} disabled />
        </FormField>
        <FormField label="Your name" htmlFor="name">
          <Input id="name" defaultValue={user?.name} disabled />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <Input id="email" defaultValue={user?.email} disabled />
        </FormField>
        <p className="font-sans text-xs text-text-muted">
          [PLACEHOLDER — profile editing wired up once remaining portal data (Milestone 12b) moves off in-memory stores.]
        </p>
        <Button variant="secondary" disabled className="self-start">
          Save changes
        </Button>
      </form>
    </div>
  );
}
