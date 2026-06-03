import { Mail, MapPin, Phone, ShieldCheck, UserCircle } from "lucide-react";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { profile } from "../../data/mockData.js";

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Profile
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Account overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Manage your account details, personal information, and security
          settings.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="User information">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Avatar</p>
                <p className="mt-1 text-sm text-slate-400">
                  Upload or update your profile picture.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-xl font-semibold text-white">
                  A
                </div>
                <Button variant="secondary">Change avatar</Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-500">
                  <UserCircle className="h-5 w-5" /> <span>Full name</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {profile.name}
                </p>
              </div>
              <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail className="h-5 w-5" /> <span>Email</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-500">
                  <MapPin className="h-5 w-5" /> <span>Location</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {profile.location}
                </p>
              </div>
              <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-500">
                  <Phone className="h-5 w-5" /> <span>Phone</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {profile.phone}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Bio</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    A short description about you and your role.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {profile.bio}
              </p>
            </div>
          </div>
        </Card>

        <Card title="Account settings">
          <form className="space-y-6">
            <Input label="Name" defaultValue={profile.name} />
            <Input label="Email" defaultValue={profile.email} />
            <Input label="Team" defaultValue={profile.team} />
            <Button type="submit" className="w-full">
              Update profile
            </Button>
          </form>
        </Card>
      </div>

      <Card title="Password update">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-slate-500" />
              <p>
                Growing your security with strong passwords and frequent
                updates.
              </p>
            </div>
          </div>

          <form className="grid gap-4 md:grid-cols-3">
            <Input label="Current password" type="password" />
            <Input label="New password" type="password" />
            <Input label="Confirm password" type="password" />
            <div className="md:col-span-3">
              <Button className="w-full">Update password</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
