import { useMemo, useState } from "react";
import { Search, Filter, Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import { projects } from "../../data/mockData.js";

const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700",
  Planning: "bg-slate-100 text-slate-700",
  "In review": "bg-amber-100 text-amber-700",
  "On hold": "bg-rose-100 text-rose-700",
};

const ProjectsPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All projects");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === "All projects" || project.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Projects
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            All projects
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Track progress, manage deadlines, and coordinate tasks across
            multiple initiatives.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto inline-flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Create project
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 min-w-0">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <button
              onClick={() => setFilter("All projects")}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <Filter className="h-4 w-4" />
              {filter}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Overview
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Projects total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {projects.length}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Most active</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                Launch rebrand
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
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
            <div className="mt-4 space-y-4">
              <ProgressBar
                value={project.progress}
                label={`Progress ${project.progress}%`}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                <span>{project.tasks} tasks</span>
                <span>Due {project.dueDate}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-500">
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-slate-700"
              >
                View details <ChevronRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-slate-400">
                <button className="rounded-full p-2 hover:bg-slate-100">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="rounded-full p-2 hover:bg-slate-100">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
