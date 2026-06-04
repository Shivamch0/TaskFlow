import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TaskCard } from '../components/TaskCard';
import { ProgressBar } from '../components/ProgressBar';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { 
  ArrowLeft, 
  Calendar, 
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
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus,
    createSubTask,
    updateSubTask,
    deleteSubTask,
    toggleSubTaskStatus
  } = useApp();

  // Find corresponding project
  const project = projects.find(p => p.id === projectId);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All', 'High', 'Medium', 'Low'

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form States
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formDueDate, setFormDueDate] = useState('');
  const [formError, setFormError] = useState('');

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you are trying to view does not exist or has been deleted."
        icon={FolderOpen}
        actionLabel="Back to Projects"
        onAction={() => navigate('/projects')}
      />
    );
  }

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormDesc('');
    setFormPriority('Medium');
    setFormDueDate('');
    setFormError('');
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDesc(task.description || '');
    setFormPriority(task.priority || 'Medium');
    setFormDueDate(task.dueDate || '');
    setFormError('');
    setIsTaskModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle.trim()) {
      setFormError('Task title is required.');
      return;
    }

    const taskData = {
      title: formTitle.trim(),
      description: formDesc.trim(),
      priority: formPriority,
      dueDate: formDueDate
    };

    if (editingTask) {
      updateTask(project.id, editingTask.id, taskData);
    } else {
      createTask(project.id, taskData);
    }

    setIsTaskModalOpen(false);
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
          to="/projects"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
      </div>

      {/* Project Banner Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-premium p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight font-display">
              {project.title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              {project.description || "No description provided for this project. Double click 'Edit Project' on the list view to add a summary."}
            </p>
          </div>
          <Button onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start md:self-auto shrink-0">
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>

        {/* Progress summary bar */}
        <div className="pt-4 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <ProgressBar value={project.progress} showText={true} size="md" />
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 justify-start md:justify-end">
            <span className="flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-500" />
              <span className="text-slate-600">{completedTasks}/{totalTasks} Tasks Completed</span>
            </span>
          </div>
        </div>
      </div>

      {/* Task Filters and Search Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tasks..."
          className="max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-4 self-stretch sm:self-auto justify-between lg:justify-end">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2 select-none">Status</span>
            {['All', 'Pending', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  statusFilter === tab
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase px-2 select-none">Priority</span>
            {['All', 'High', 'Medium', 'Low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPriorityFilter(tab)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  priorityFilter === tab
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
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
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            label="Task Name"
            type="text"
            placeholder="e.g. Implement user login form"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            error={formError}
            required
            autoFocus
          />

          <Input
            label="Task Description"
            type="textarea"
            placeholder="Describe the task parameters, requirements, or links..."
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Priority"
              type="select"
              value={formPriority}
              onChange={(e) => setFormPriority(e.target.value)}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' }
              ]}
            />

            <Input
              label="Due Date"
              type="date"
              value={formDueDate}
              onChange={(e) => setFormDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
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
