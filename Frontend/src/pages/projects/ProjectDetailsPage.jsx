import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { projects, tasks } from "../../data/mockData.js";

const taskStatuses = {
  "In progress": "bg-slate-100 text-slate-700",
  Pending: "bg-amber-100 text-amber-700",
  Blocked: "bg-rose-100 text-rose-700",
};

const subtasks = [
  { id: "s1", title: "Outline content structure", completed: true },
  { id: "s2", title: "Review stakeholder notes", completed: false },
  { id: "s3", title: "Design final layout", completed: false },
];

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId) || projects[0];
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const projectTasks = useMemo(
    () => tasks.filter((task) => task.project === project.name),
    [project.name],
  );

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to="/projects"
            className="text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            ← Back to projects
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md">
            Edit project
          </Button>
          <Button size="md" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card title="Project details">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Due date</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">
                    {project.dueDate}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Task count</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">
                    {project.tasks}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Progress
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Completion percentage of this project.
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
                    {project.progress}%
                  </div>
                </div>
                <div className="mt-6">
                  <ProgressBar value={project.progress} />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Task list">
            <div className="space-y-4">
              {projectTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {task.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                        <span>{task.project}</span>
                        <span>•</span>
                        <span>Due {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${taskStatuses[task.status]}`}
                      >
                        {task.status}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <p className="text-sm text-slate-500">Task progress</p>
                      <ProgressBar value={task.completed} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Subtasks</p>
                      <div className="mt-3 rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                        {subtasks.map((subtask) => (
                          <div
                            key={subtask.id}
                            className="flex items-center justify-between gap-3 border-b border-slate-100 py-2 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${subtask.completed ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </span>
                              <span>{subtask.title}</span>
                            </div>
                            <span className="text-xs text-slate-400">
                              {subtask.completed ? "Done" : "Pending"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Project statistics">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Completion</span>
                  <span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} className="mt-3" />
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Next milestone</span>
                  <span className="font-semibold text-slate-900">
                    Publish launch copy
                  </span>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Focus time</span>
                  <span className="font-semibold text-slate-900">18 hrs</span>
                </div>
              </div>
            </div>
          </Card>
          <Card title="Timeline" subtitle="Latest activity">
            <div className="space-y-4">
              {[
                "Milestone updated",
                "Design review completed",
                "Sprint plan published",
              ].map((event, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {event}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {index === 0
                      ? "2 hours ago"
                      : index === 1
                        ? "Yesterday"
                        : "2 days ago"}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal
        title="Create task"
        open={showCreate}
        onClose={() => setShowCreate(false)}
        actions={
          <>
            <Button onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Save task</Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            Task creation form placeholder. This modal demonstrates UI for
            adding a new task in the project detail view.
          </p>
        </div>
      </Modal>

      <Modal
        title="Edit task"
        open={showEdit}
        onClose={() => setShowEdit(false)}
        actions={
          <>
            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button>Update task</Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            This placeholder modal demonstrates task editing UI inside project
            details.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailsPage;
