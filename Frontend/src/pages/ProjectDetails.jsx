import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useApp } from '../context/AppContext';
import { TaskCard } from '../components/TaskCard';
import { ProgressBar } from '../components/ProgressBar';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Loader } from '../components/Loader';
import { 
  ArrowLeft, 
  CheckSquare, 
  Plus, 
  ListTodo,
  FolderOpen
} from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { 
    projects, 
    isLoading,
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus,
    createSubTask,
    updateSubTask,
    deleteSubTask,
    toggleSubTaskStatus
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All', 'High', 'Medium', 'Low'

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Find corresponding project
  const project = projects.find(p => p.id === projectId);

  // Formik form setup with Yup validation schema
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editingTask ? editingTask.title : '',
      description: editingTask ? (editingTask.description || '') : '',
      priority: editingTask ? (editingTask.priority || 'Medium') : 'Medium',
      dueDate: editingTask ? (editingTask.dueDate || '') : '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Task name must be at least 3 characters')
        .required('Task name is required'),
      description: Yup.string()
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
      priority: Yup.string()
        .oneOf(['Low', 'Medium', 'High'])
        .required('Priority is required'),
      dueDate: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      const taskData = {
        title: values.title.trim(),
        description: values.description.trim(),
        priority: values.priority,
        dueDate: values.dueDate
      };

      if (editingTask) {
        await updateTask(project.id, editingTask.id, taskData);
      } else {
        await createTask(project.id, taskData);
      }

      setIsTaskModalOpen(false);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24 animate-pulse mb-2" />
        </div>
        
        {/* Project Banner Card Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium p-6 sm:p-8 space-y-6 animate-pulse">
          <div className="space-y-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
          </div>
          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 h-4 bg-slate-100 dark:bg-slate-850 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 justify-self-end" />
          </div>
        </div>

        {/* Filters Toolbar Skeleton */}
        <div className="h-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl animate-pulse" />

        {/* Task Rows Skeletons */}
        <Loader type="row-skeleton" count={4} />
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you are trying to view does not exist or has been deleted."
        icon={FolderOpen}
        actionLabel="Back to Projects"
        onAction={() => navigate('/dashboard/projects')}
      />
    );
  }

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    formik.resetForm();
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task? All subtasks inside will be deleted.')) {
      deleteTask(project.id, taskId);
    }
  };

  // Subtask actions wrapped for AppContext
  const handleCreateSubtask = (taskId, title) => {
    createSubTask(project.id, taskId, title);
  };

  const handleUpdateSubtask = (taskId, subTaskId, title) => {
    updateSubTask(project.id, taskId, subTaskId, title);
  };

  const handleDeleteSubtask = (taskId, subTaskId) => {
    deleteSubTask(project.id, taskId, subTaskId);
  };

  const handleToggleSubtask = (taskId, subTaskId) => {
    toggleSubTaskStatus(project.id, taskId, subTaskId);
  };

  // Filter tasks based on Search, Status, and Priority
  const filteredTasks = (project.tasks || []).filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'All' ||
      (statusFilter === 'Pending' && !task.completed) ||
      (statusFilter === 'Completed' && task.completed);

    const matchesPriority = 
      priorityFilter === 'All' ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = (project.tasks || []).length;
  const completedTasks = (project.tasks || []).filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Back button and breadcrumbs */}
      <div>
        <Link 
          to="/dashboard/projects"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
      </div>

      {/* Project Banner Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-display">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
              {project.description || "No description provided for this project. Double click 'Edit Project' on the list view to add a summary."}
            </p>
          </div>
          <Button onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start md:self-auto shrink-0">
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>

        {/* Progress summary bar */}
        <div className="pt-4 border-t border-slate-50 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <ProgressBar value={project.progress} showText={true} size="md" />
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500 justify-start md:justify-end">
            <span className="flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-500" />
              <span className="text-slate-600 dark:text-slate-300">{completedTasks}/{totalTasks} Tasks Completed</span>
            </span>
          </div>
        </div>
      </div>

      {/* Task Filters and Search Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tasks..."
          className="max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-4 self-stretch sm:self-auto justify-between lg:justify-end">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-850 p-1 rounded-lg border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 select-none">Status</span>
            {['All', 'Pending', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  statusFilter === tab
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-850 p-1 rounded-lg border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 select-none">Priority</span>
            {['All', 'High', 'Medium', 'Low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPriorityFilter(tab)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  priorityFilter === tab
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cards List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleTask={(taskId) => toggleTaskStatus(project.id, taskId)}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onCreateSubtask={handleCreateSubtask}
              onUpdateSubtask={handleUpdateSubtask}
              onDeleteSubtask={handleDeleteSubtask}
              onToggleSubtask={handleToggleSubtask}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' ? "No matching tasks" : "No tasks in project"}
          description={searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
            ? "Try refining your search keyword or resetting active filters."
            : "Plan ahead by breaking down this project into executable tasks."}
          icon={ListTodo}
          actionLabel={searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' ? "Clear Search Filters" : "Add Your First Task"}
          onAction={searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
            ? () => { setSearchQuery(''); setStatusFilter('All'); setPriorityFilter('All'); }
            : handleOpenCreateModal}
        />
      )}

      {/* Task Create / Edit Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label="Task Name"
            type="text"
            placeholder="e.g. Implement user login form"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />

          <Input
            label="Task Description"
            type="textarea"
            placeholder="Describe the task parameters, requirements, or links..."
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Priority"
              type="select"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && formik.errors.priority}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' }
              ]}
            />

            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dueDate && formik.errors.dueDate}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
            <Button variant="outline" type="button" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTask ? "Save Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
