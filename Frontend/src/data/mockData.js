export const stats = [
  { label: 'Total Projects', value: 24, change: '+12%', accent: 'bg-slate-100 text-slate-700' },
  { label: 'Total Tasks', value: 138, change: '+8%', accent: 'bg-slate-100 text-slate-700' },
  { label: 'Completed Tasks', value: 96, change: '+18%', accent: 'bg-emerald-100 text-emerald-700' },
  { label: 'Pending Tasks', value: 42, change: '-4%', accent: 'bg-amber-100 text-amber-700' },
];

export const recentProjects = [
  { id: 'p1', name: 'Launch rebrand', description: 'Modernize product identity and website experience.', progress: 76, tasks: 12, status: 'Active', dueDate: 'Jun 18, 2026' },
  { id: 'p2', name: 'Sprint planning', description: 'Prepare next sprint board and stakeholder review.', progress: 42, tasks: 18, status: 'Planning', dueDate: 'Jun 24, 2026' },
  { id: 'p3', name: 'UX audit', description: 'Complete taskflow audit and interaction refinement.', progress: 63, tasks: 8, status: 'In review', dueDate: 'Jun 12, 2026' },
];

export const recentTasks = [
  { id: 't1', title: 'Refine onboarding flow', project: 'Launch rebrand', dueDate: 'Today', status: 'In progress' },
  { id: 't2', title: 'Update roadmap deck', project: 'Sprint planning', dueDate: 'Jun 10', status: 'Pending' },
  { id: 't3', title: 'Design new dashboard', project: 'UX audit', dueDate: 'Jun 14', status: 'Blocked' },
];

export const projects = [
  { id: 'p1', name: 'Launch rebrand', description: 'Redesign homepage, marketing pages, and onboarding flows.', progress: 76, tasks: 34, status: 'Active', dueDate: 'Jun 18, 2026' },
  { id: 'p2', name: 'Sprint planning', description: 'Coordinate tasks, dependencies, and release schedule.', progress: 42, tasks: 28, status: 'Planning', dueDate: 'Jun 24, 2026' },
  { id: 'p3', name: 'UX audit', description: 'Review user journeys and accessibility improvements.', progress: 63, tasks: 17, status: 'In review', dueDate: 'Jun 12, 2026' },
  { id: 'p4', name: 'Q3 roadmap', description: 'Organize strategic goals, initiatives, and milestones.', progress: 22, tasks: 9, status: 'On hold', dueDate: 'Jul 02, 2026' },
  { id: 'p5', name: 'Customer support', description: 'Improve support workflows and ticket management.', progress: 91, tasks: 14, status: 'Active', dueDate: 'Jun 08, 2026' },
];

export const tasks = [
  { id: 't1', title: 'Prepare sprint kickoff', project: 'Sprint planning', dueDate: 'Jun 11', priority: 'High', status: 'In progress', completed: 62, subtasks: 4 },
  { id: 't2', title: 'Write launch copy', project: 'Launch rebrand', dueDate: 'Jun 16', priority: 'Medium', status: 'Pending', completed: 24, subtasks: 3 },
  { id: 't3', title: 'Review analytics dashboard', project: 'UX audit', dueDate: 'Jun 14', priority: 'Low', status: 'Blocked', completed: 40, subtasks: 5 },
  { id: 't4', title: 'Finalize pricing page', project: 'Launch rebrand', dueDate: 'Jun 18', priority: 'High', status: 'In progress', completed: 78, subtasks: 6 },
];

export const activityTimeline = [
  { time: '9:15 AM', event: 'New task created for Launch rebrand' },
  { time: '10:02 AM', event: 'Project Sprint planning moved to Review' },
  { time: '11:30 AM', event: 'Comment added to UX audit task' },
  { time: '1:45 PM', event: 'Completed design review checklist' },
];

export const profile = {
  name: 'Alex Morgan',
  role: 'Product Designer',
  email: 'alex.morgan@taskflow.com',
  team: 'Design Operations',
  phone: '+1 (555) 123-4567',
  location: 'Austin, TX',
  bio: 'Passionate about crafting product experiences that empower teams to do their best work.',
};
