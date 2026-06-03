import { useMemo, useState } from "react";
import { Search, Filter, Plus, Edit3, Trash2, ChevronDown } from "lucide-react";
import Breadcrumbs from "../../components/layout/Breadcrumbs.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { tasks } from "../../data/mockData.js";

const badgeColors = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-700",
  "In progress": "bg-slate-100 text-slate-700",
  Pending: "bg-amber-100 text-amber-700",
  Blocked: "bg-rose-100 text-rose-700",
};

const TasksPage = () => {
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.project.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Task management
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            My tasks
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor status, due dates, and priorities for your active task list.
          </p>
        </div>
        <Button size="lg" onClick={() => setShowCreate(true)}>
          <Plus className="h-5 w-5" /> Create task
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 hover:bg-slate-100">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 hover:bg-slate-100">
              <ChevronDown className="h-4 w-4" /> Sort
            </button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="group hover:shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {task.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{task.project}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 font-semibold ${badgeColors[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-semibold ${badgeColors[task.status]}`}
                >
                  {task.status}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  Due {task.dueDate}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <ProgressBar
                  value={task.completed}
                  label={`Completion ${task.completed}%`}
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>{task.subtasks} subtasks</span>
                <span className="hidden sm:inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" /> {task.dueDate}
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-slate-500">
              <button
                onClick={() => setShowEdit(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:bg-slate-100"
              >
                <Edit3 className="h-4 w-4" /> Edit
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </Card>
        ))}
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
            Task creation modal UI placeholder. Use this to define task title,
            priority, due date, and project assignment.
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
            This modal simulates the task editing experience with priority and
            status controls.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default TasksPage;
