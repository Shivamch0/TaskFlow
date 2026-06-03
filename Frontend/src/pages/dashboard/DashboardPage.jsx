import {
  BarChart3,
  CheckCircle2,
  ListChecks,
  Clock3,
  Plus,
  Sparkles,
} from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import Button from "../../components/ui/Button.jsx";
import { stats, recentProjects, recentTasks } from "../../data/mockData.js";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";

const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Planning: "bg-slate-100 text-slate-700",
  "In review": "bg-amber-100 text-amber-700",
  Blocked: "bg-rose-100 text-rose-700",
};

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <Card
          title="Welcome back, Alex"
          subtitle="Your productivity summary for today"
        >
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {item.label}
                  </p>
                  <div className="mt-3 flex items-end gap-3">
                    <p className="text-3xl font-semibold text-slate-900">
                      {item.value}
                    </p>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${item.accent}`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Productivity overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                      Weekly progress
                    </h2>
                  </div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-8 h-52 rounded-3xl bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 bg-cover bg-center" />
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span>Tasks completed</span>
                  <span className="text-slate-300">•</span>
                  <span>Time on focus</span>
                  <span className="text-slate-300">•</span>
                  <span>Project velocity</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Quick actions
                  </h3>
                  <Plus className="h-5 w-5 text-slate-400" />
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    "New project",
                    "Add task",
                    "Review board",
                    "Invite teammate",
                  ].map((action) => (
                    <button
                      key={action}
                      className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      <span>{action}</span>
                      <Sparkles className="h-4 w-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Recent projects">
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <ProgressBar
                      value={project.progress}
                      label={`Completion ${project.progress}%`}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                      <span>{project.tasks} tasks</span>
                      <span>Due {project.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Recent tasks">
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {task.project}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>Due {task.dueDate}</span>
                    <span className="inline-flex items-center gap-2 text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> On
                      track
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
