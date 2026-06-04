import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckSquare, Edit, Trash2, ArrowRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

export function ProjectCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();
  
  const tasks = project.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-premium p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-premium-hover group">
      <div>
        {/* Title & Actions */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 
            onClick={() => navigate(`/projects/${project.id}`)}
            className="text-base font-bold text-slate-800 hover:text-indigo-600 cursor-pointer font-display transition-colors line-clamp-1 flex-1"
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
              title="Edit Project"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed h-10">
          {project.description || "No description provided."}
        </p>
      </div>

      <div>
        {/* Progress Section */}
        <div className="mb-4">
          <ProgressBar value={project.progress} showText={true} size="sm" />
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1" title="Completed tasks">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-slate-600">{completedTasks}/{totalTasks} Tasks</span>
            </span>
            <span className="flex items-center gap-1" title="Created date">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors font-bold uppercase tracking-wider text-[10px]"
          >
            Open <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
