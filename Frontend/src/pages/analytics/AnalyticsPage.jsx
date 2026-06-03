import { Activity, CalendarDays, TrendingUp, CircleDashed } from "lucide-react";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import { activityTimeline, stats } from "../../data/mockData.js";

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Analytics
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Productivity insights
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Explore progress trends, completion patterns, and team activity at a
          glance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Productivity score</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                86%
              </h2>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm text-slate-500">
              This week has seen consistent velocity and fewer blocked tasks.
            </p>
            <ProgressBar value={86} />
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Weekly progress</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                72%
              </h2>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm text-slate-500">
              Goal alignment is strong with most milestones on track.
            </p>
            <ProgressBar value={72} />
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Monthly completion</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                91%
              </h2>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
              <CircleDashed className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm text-slate-500">
              Focus remains high across product and design workstreams.
            </p>
            <ProgressBar value={91} />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Weekly progress chart">
          <div className="mt-6 h-72 rounded-3xl bg-linear-to-r from-slate-900 via-slate-700 to-slate-500" />
        </Card>

        <Card title="Monthly statistics">
          <div className="mt-6 h-72 rounded-3xl bg-linear-to-br from-slate-100 to-slate-50" />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Completion trends">
          <div className="mt-6 h-64 rounded-3xl bg-slate-50 p-6 text-slate-500">
            <p className="text-sm">
              Placeholder for a line chart showing completion trends over time.
            </p>
          </div>
        </Card>

        <Card title="Activity timeline">
          <div className="space-y-4">
            {activityTimeline.map((item) => (
              <div
                key={item.time}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
                  <span>{item.time}</span>
                  <span>{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
