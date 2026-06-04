import React, { useState } from 'react';
import { Check, Edit2, Trash2, X, CheckSquare, Square } from 'lucide-react';

export function SubTaskItem({ subtask, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subtask.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(subtask.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(subtask.title);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center justify-between py-2 px-3 hover:bg-slate-50/50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {/* Toggle Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(subtask.id)}
          className={`flex-shrink-0 w-4 h-4 rounded border transition-colors flex items-center justify-center ${
            subtask.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 hover:border-slate-400 text-transparent bg-white'
          }`}
        >
          {subtask.completed && <Check className="w-3 h-3 stroke-[3]" />}
        </button>

        {/* Title or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-1.5 flex-1">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-xs px-2 py-0.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              autoFocus
            />
            <button
              type="submit"
              className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-0.5 text-slate-400 hover:bg-slate-100 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <span className={`text-xs truncate transition-all ${
            subtask.completed ? 'text-slate-400 line-through' : 'text-slate-600'
          }`}>
            {subtask.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
            title="Edit Subtask"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(subtask.id)}
            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete Subtask"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
