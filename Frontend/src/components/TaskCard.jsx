import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  Check, 
  Plus, 
  ListTodo,
  AlertCircle,
  X
} from 'lucide-react';
import { SubTaskItem } from './SubTaskItem';
import { ProgressBar } from './ProgressBar';

export function TaskCard({ 
  task, 
  onToggleTask, 
  onEditTask, 
  onDeleteTask,
  onCreateSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  onToggleSubtask
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const subtasks = task.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter(s => s.completed).length;
  
  // Calculate individual task subtask progress percentage
  const taskProgress = totalSubtasks > 0 
    ? Math.round((completedSubtasks / totalSubtasks) * 100) 
    : (task.completed ? 100 : 0);

  // Check if date is overdue
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));

  const priorityStyles = {
    High: 'text-red-700 bg-red-50 border-red-100',
    Medium: 'text-amber-700 bg-amber-50 border-amber-100',
    Low: 'text-blue-700 bg-blue-50 border-blue-100'
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtaskTitle.trim()) {
      onCreateSubtask(task.id, newSubtaskTitle.trim());
      setNewSubtaskTitle('');
      setIsAddingSubtask(false);
      setIsExpanded(true); // make sure it stays expanded
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-100 shadow-premium transition-all duration-300 ${
      task.completed ? 'opacity-80' : ''
    }`}>
      {/* Main Task Row */}
      <div className="p-5 flex items-start gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onToggleTask(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-md border transition-colors flex items-center justify-center mt-1 ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-slate-300 hover:border-indigo-500 text-transparent bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${priorityStyles[task.priority] || priorityStyles.Medium}`}>
                {task.priority}
              </span>
              {task.dueDate && (
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${isOverdue ? 'text-red-600 font-semibold' : 'text-slate-400'}`}>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {isOverdue && " (Overdue)"}
                  </span>
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEditTask(task)}
                className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                title="Edit Task"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <h4 className={`text-base font-bold font-display ${
            task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}>
            {task.title}
          </h4>

          {task.description && (
            <p className={`text-sm text-slate-500 mt-1 leading-relaxed ${
              task.completed ? 'line-through opacity-60' : ''
            }`}>
              {task.description}
            </p>
          )}

          {/* Subtask Stats summary row */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <ListTodo className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {totalSubtasks > 0 
                  ? `${completedSubtasks}/${totalSubtasks} Subtasks` 
                  : 'No Subtasks'}
              </span>
            </button>

            {/* Micro Progress Indicator */}
            {totalSubtasks > 0 && (
              <div className="flex items-center gap-2 w-32">
                <div className="flex-1">
                  <ProgressBar value={taskProgress} size="sm" />
                </div>
                <span className="text-[10px] font-bold text-slate-500">{taskProgress}%</span>
              </div>
            )}

            {totalSubtasks === 0 && (
              <button
                onClick={() => {
                  setIsAddingSubtask(true);
                  setIsExpanded(true);
                }}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 rounded transition-colors uppercase tracking-wider"
              >
                <Plus className="w-3 h-3" /> Add Subtask
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Subtasks Panel */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-slate-50 bg-slate-50/20 rounded-b-xl space-y-2.5 pt-3">
          {/* Subtask list */}
          {totalSubtasks > 0 && (
            <div className="space-y-1">
              {subtasks.map((sub) => (
                <SubTaskItem
                  key={sub.id}
                  subtask={sub}
                  onToggle={(subId) => onToggleSubtask(task.id, subId)}
                  onEdit={(subId, title) => onUpdateSubtask(task.id, subId, title)}
                  onDelete={(subId) => onDeleteSubtask(task.id, subId)}
                />
              ))}
            </div>
          )}

          {/* Inline Add Form */}
          {isAddingSubtask || totalSubtasks > 0 ? (
            <form onSubmit={handleAddSubtask} className="flex items-center gap-2 mt-2 px-1">
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white placeholder-slate-400"
                autoFocus={isAddingSubtask}
              />
              <button
                type="submit"
                className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                title="Save Subtask"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              {totalSubtasks > 0 && (
                <button
                  type="button"
                  onClick={() => setIsAddingSubtask(false)}
                  className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          ) : null}
        </div>
      )}
    </div>
  );
}
