// Initial mock data for TaskFlow

export const DEFAULT_USER = {
  name: "Shivam Choudhary",
  email: "test@example.com",
  password: "password123",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
};

export const INITIAL_PROJECTS = [
  {
    id: "proj_1",
    title: "TaskFlow SaaS Application",
    description: "Build a beautiful frontend-only project management tool with Local Storage persistence.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    progress: 66,
    tasks: [
      {
        id: "task_1_1",
        title: "Design System & CSS Styling",
        description: "Create a modern SaaS UI dashboard using Tailwind CSS v4 and Google Fonts.",
        priority: "High",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        completed: false,
        subtasks: [
          { id: "sub_1_1_1", title: "Configure tailwind custom themes", completed: true },
          { id: "sub_1_1_2", title: "Import Google Fonts (Inter & Outfit)", completed: true },
          { id: "sub_1_1_3", title: "Create global styling and custom scrollbars", completed: false }
        ]
      },
      {
        id: "task_1_2",
        title: "State Management & Operations",
        description: "Implement AppContext and hooks for Projects, Tasks, and Subtasks CRUD.",
        priority: "High",
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
        completed: false,
        subtasks: [
          { id: "sub_1_2_1", title: "Implement useLocalStorage hook", completed: true },
          { id: "sub_1_2_2", title: "Set up Context API for Projects CRUD", completed: true },
          { id: "sub_1_2_3", title: "Set up Task and Subtask CRUD in Context", completed: false },
          { id: "sub_1_2_4", title: "Implement progress bar auto-recalculation", completed: false }
        ]
      },
      {
        id: "task_1_3",
        title: "Dashboard & Navigation Components",
        description: "Develop Sidebar, Navbar, and StatsCards for dashboard layouts.",
        priority: "Medium",
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days from now
        completed: true,
        subtasks: [
          { id: "sub_1_3_1", title: "Build responsive Sidebar and active routes styling", completed: true },
          { id: "sub_1_3_2", title: "Build top Navbar with search bar and user profile dropdown", completed: true }
        ]
      }
    ]
  },
  {
    id: "proj_2",
    title: "Marketing Campaign Q3",
    description: "Plan and coordinate the launch campaign for our new SaaS landing pages.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    progress: 50,
    tasks: [
      {
        id: "task_2_1",
        title: "Social Media Ads Creatives",
        description: "Draft layouts, copywriting, and graphics for LinkedIn and Twitter product ads.",
        priority: "Medium",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        subtasks: [
          { id: "sub_2_1_1", title: "Design 3 promotional graphics banner", completed: true },
          { id: "sub_2_1_2", title: "Write ad captions and call-to-actions", completed: false }
        ]
      },
      {
        id: "task_2_2",
        title: "Press Release & Outreach",
        description: "Submit press kit drafts to technology publications and coordinate embargoes.",
        priority: "Low",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        subtasks: [
          { id: "sub_2_2_1", title: "Write press release body", completed: false },
          { id: "sub_2_2_2", title: "Compile list of editor emails", completed: false }
        ]
      }
    ]
  },
  {
    id: "proj_3",
    title: "Mobile App Wireframes",
    description: "Design Figma wireframes for the upcoming iOS & Android companion applications.",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 100,
    tasks: [
      {
        id: "task_3_1",
        title: "User Flow Mapping & Wireframes",
        description: "Map key app workflows including Login, Onboarding, and Main Dash.",
        priority: "High",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: true,
        subtasks: [
          { id: "sub_3_1_1", title: "Design interactive user flow diagram", completed: true },
          { id: "sub_3_1_2", title: "Create low-fidelity wireframes in Figma", completed: true }
        ]
      }
    ]
  }
];
