import { auth } from "@/auth";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { findUserById } from "@/lib/auth/store";

export default async function AssessorProfilePage() {
  const session = await auth();
  const user = await findUserById(session!.user.id);

  return (
    <div className="max-w-md px-6 py-8">
      <h1 className="font-display text-2xl font-semibold text-text">Profile</h1>
      <form className="mt-6 flex flex-col gap-5">
        <FormField label="Name" htmlFor="name">
          <Input id="name" defaultValue={user?.name} disabled />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <Input id="email" defaultValue={user?.email} disabled />
        </FormField>
        <p className="font-sans text-xs text-text-muted">
          [PLACEHOLDER — biography/qualifications editing form not built yet;
          the underlying Assessor.bio field is real (Milestone 11).]
        </p>
      </form>
    </div>
  );
}
