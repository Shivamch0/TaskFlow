import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { Loader } from '../components/Loader';
import { FolderKanban, Plus } from 'lucide-react';

export default function Projects() {
  const { projects, isLoading, createProject, updateProject, deleteProject } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('All'); // 'All', 'In Progress', 'Completed'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Formik form setup with Yup validation schema
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editingProject ? editingProject.title : '',
      description: editingProject ? (editingProject.description || '') : '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Project title must be at least 3 characters')
        .max(100, 'Project title cannot exceed 100 characters')
        .required('Project title is required'),
      description: Yup.string()
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
    }),
    onSubmit: async (values) => {
      if (editingProject) {
        await updateProject(editingProject.id, values.title.trim(), values.description.trim());
      } else {
        await createProject(values.title.trim(), values.description.trim());
      }
      setIsModalOpen(false);
    },
  });

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    formik.resetForm();
    setIsModalOpen(true);
  };

  // Handle URL query parameter `?create=true`
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('create') === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleOpenCreateModal();
      // Clear query params to prevent reopening on reload
      navigate('/dashboard/projects', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate]);

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? All tasks inside will be permanently deleted.')) {
      deleteProject(projectId);
    }
  };

  // Filter & Search Logic
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.description && proj.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = 
      filterState === 'All' ||
      (filterState === 'In Progress' && proj.progress < 100) ||
      (filterState === 'Completed' && proj.progress === 100);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-display">
            Projects
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-550 font-medium">
            Manage your workspaces, set priorities, and track milestones.
          </p>
        </div>
        <Button onClick={handleOpenCreateModal} className="flex items-center gap-1.5 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects..."
          className="max-w-xs"
        />

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 self-stretch sm:self-auto bg-slate-50 dark:bg-slate-850 p-1 rounded-lg border border-slate-100 dark:border-slate-800">
          {['All', 'In Progress', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterState(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filterState === tab
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-450 shadow-sm'
                  : 'text-slate-550 dark:text-slate-450 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <Loader type="card-skeleton" count={6} />
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery || filterState !== 'All' ? "No matching projects" : "No projects found"}
          description={searchQuery || filterState !== 'All' 
            ? "Try refining your search keyword or changing your active filters." 
            : "Get started by creating your first project container!"}
          icon={FolderKanban}
          actionLabel={searchQuery || filterState !== 'All' ? "Clear Search Filters" : "Create New Project"}
          onAction={searchQuery || filterState !== 'All' 
            ? () => { setSearchQuery(''); setFilterState('All'); } 
            : handleOpenCreateModal}
        />
      )}

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project Details" : "Create New Project"}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            type="text"
            placeholder="e.g. Mobile App Redesign"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />

          <Input
            label="Project Description"
            type="textarea"
            placeholder="Summarize the core goal of this project..."
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProject ? "Save Changes" : "Create Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
