import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '../data/initialData';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { currentUser } = useAuth();
  
  // State for all projects
  const [projects, setProjects] = useState(() => {
    try {
      //! Local Storage
      const stored = window.localStorage.getItem('taskflow_projects');
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch (e) {
      console.error(e);
      return INITIAL_PROJECTS;
    }
  });

  // Save projects to local storage when state changes
  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    try {
      //! Local Storage
      window.localStorage.setItem('taskflow_projects', JSON.stringify(updatedProjects));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to recalculate a single project's progress
  const recalculateProgress = (project) => {
    const tasks = project.tasks || [];
    
    // Flatten all subtasks from all tasks
    const allSubtasks = tasks.reduce((acc, task) => {
      return acc.concat(task.subtasks || []);
    }, []);

    const totalSubtasks = allSubtasks.length;
    
    if (totalSubtasks > 0) {
      const completedSubtasks = allSubtasks.filter(st => st.completed).length;
      return Math.round((completedSubtasks / totalSubtasks) * 100);
    }

    // Fallback: If no subtasks, calculate based on completed tasks
    const totalTasks = tasks.length;
    if (totalTasks > 0) {
      const completedTasks = tasks.filter(t => t.completed).length;
      return Math.round((completedTasks / totalTasks) * 100);
    }

    return 0;
  };

  // Helper to update progress on a list of projects for a specific project
  const updateProjectInList = (projectsList, projectId, updates) => {
    return projectsList.map(proj => {
      if (proj.id === projectId) {
        const updatedProj = { ...proj, ...updates };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });
  };

  // ==========================================
  // PROJECT OPERATIONS
  // ==========================================
  
  const createProject = (title, description) => {
    const newProject = {
      id: `proj_${Date.now()}`,
      title,
      description,
      createdAt: new Date().toISOString(),
      progress: 0,
      tasks: []
    };

    const updated = [newProject, ...projects];
    saveProjects(updated);
    return newProject;
  };

  const updateProject = (projectId, title, description) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        return {
          ...proj,
          title,
          description
        };
      }
      return proj;
    });
    saveProjects(updated);
  };

  const deleteProject = (projectId) => {
    const updated = projects.filter(proj => proj.id !== projectId);
    saveProjects(updated);
  };

  // ==========================================
  // TASK OPERATIONS
  // ==========================================

  const createTask = (projectId, taskData) => {
    const { title, description, priority, dueDate } = taskData;
    const newTask = {
      id: `task_${Date.now()}`,
      title,
      description: description || '',
      priority: priority || 'Medium',
      dueDate: dueDate || '',
      completed: false,
      subtasks: []
    };

    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = [...(proj.tasks || []), newTask];
        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });
    
    saveProjects(updated);
    return newTask;
  };

  const updateTask = (projectId, taskId, taskData) => {
    const { title, description, priority, dueDate } = taskData;
    
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              title,
              description: description !== undefined ? description : task.description,
              priority: priority !== undefined ? priority : task.priority,
              dueDate: dueDate !== undefined ? dueDate : task.dueDate
            };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  const deleteTask = (projectId, taskId) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).filter(task => task.id !== taskId);
        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  const toggleTaskStatus = (projectId, taskId) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            const nextCompleted = !task.completed;
            // When task is toggled, toggle all its subtasks to match
            const updatedSubtasks = (task.subtasks || []).map(sub => ({
              ...sub,
              completed: nextCompleted
            }));

            return {
              ...task,
              completed: nextCompleted,
              subtasks: updatedSubtasks
            };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  // ==========================================
  // SUBTASK OPERATIONS
  // ==========================================

  const createSubTask = (projectId, taskId, title) => {
    const newSubTask = {
      id: `sub_${Date.now()}`,
      title,
      completed: false
    };

    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            const updatedSub = [...(task.subtasks || []), newSubTask];
            return {
              ...task,
              completed: false, // Adding an incomplete subtask means the task isn't fully completed
              subtasks: updatedSub
            };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
    return newSubTask;
  };

  const updateSubTask = (projectId, taskId, subTaskId, title) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            const updatedSub = (task.subtasks || []).map(sub => {
              if (sub.id === subTaskId) {
                return { ...sub, title };
              }
              return sub;
            });
            return { ...task, subtasks: updatedSub };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  const deleteSubTask = (projectId, taskId, subTaskId) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            const updatedSub = (task.subtasks || []).filter(sub => sub.id !== subTaskId);
            // Check if remaining subtasks are all completed (to auto-complete the task)
            const allCompleted = updatedSub.length > 0 && updatedSub.every(s => s.completed);
            return {
              ...task,
              completed: allCompleted,
              subtasks: updatedSub
            };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  const toggleSubTaskStatus = (projectId, taskId, subTaskId) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        const updatedTasks = (proj.tasks || []).map(task => {
          if (task.id === taskId) {
            const updatedSub = (task.subtasks || []).map(sub => {
              if (sub.id === subTaskId) {
                return { ...sub, completed: !sub.completed };
              }
              return sub;
            });

            // If all subtasks are completed, the parent task is completed.
            const allCompleted = updatedSub.length > 0 && updatedSub.every(s => s.completed);

            return {
              ...task,
              completed: allCompleted,
              subtasks: updatedSub
            };
          }
          return task;
        });

        const updatedProj = { ...proj, tasks: updatedTasks };
        updatedProj.progress = recalculateProgress(updatedProj);
        return updatedProj;
      }
      return proj;
    });

    saveProjects(updated);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        createSubTask,
        updateSubTask,
        deleteSubTask,
        toggleSubTaskStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
