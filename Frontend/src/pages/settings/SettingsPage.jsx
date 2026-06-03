import {
  Moon,
  Bell,
  SlidersHorizontal,
  LayoutGrid,
  CreditCard,
} from "lucide-react";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Personalize your workspace
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Adjust theme, notifications, and account preferences for your team.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Theme settings">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-4 text-slate-700">
                <Moon className="h-5 w-5" />
                <div>
                  <p className="font-semibold text-slate-900">Theme mode</p>
                  <p className="text-sm text-slate-500">
                    Switch between light and dark mode styles.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {["Light", "Dim", "Dark"].map((mode) => (
                  <button
                    key={mode}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-4 text-slate-700">
                <LayoutGrid className="h-5 w-5" />
                <div>
                  <p className="font-semibold text-slate-900">
                    Layout preferences
                  </p>
                  <p className="text-sm text-slate-500">
                    Choose compact or spacious project and task layouts.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {["Spacious", "Compact"].map((item) => (
                  <button
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Notification settings">
          <div className="space-y-4">
            {[
              {
                label: "Project updates",
                description: "Receive notifications for project changes.",
              },
              {
                label: "Task reminders",
                description: "Remind me about upcoming due dates.",
              },
              {
                label: "Weekly summary",
                description: "Send a weekly productivity summary.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                  On
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Account preferences">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4 text-slate-700">
              <SlidersHorizontal className="h-5 w-5" />
              <div>
                <p className="font-semibold text-slate-900">Default view</p>
                <p className="text-sm text-slate-500">
                  Select the first page you see when you open TaskFlow.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Dashboard", "Projects", "Analytics"].map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4 text-slate-700">
              <CreditCard className="h-5 w-5" />
              <div>
                <p className="font-semibold text-slate-900">Billing details</p>
                <p className="text-sm text-slate-500">
                  Manage team billing and subscription preferences.
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-500">
              Billing view is mocked in this UI and not connected to actual
              payment flows.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
