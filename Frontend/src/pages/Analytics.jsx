import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, CheckCircle, PieChart, Sparkles, Award } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';

export default function Analytics() {
  const { projects } = useApp();
  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' or 'monthly'

  // Flatten all tasks
  const allTasks = projects.reduce((acc, proj) => {
    return acc.concat(proj.tasks || []);
  }, []);

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate task counts by priority
  const highPriority = allTasks.filter(t => t.priority === 'High');
  const medPriority = allTasks.filter(t => t.priority === 'Medium');
  const lowPriority = allTasks.filter(t => t.priority === 'Low');

  const highComp = highPriority.filter(t => t.completed).length;
  const medComp = medPriority.filter(t => t.completed).length;
  const lowComp = lowPriority.filter(t => t.completed).length;

  const mockWeeklyData = [
    { day: 'Mon', target: 5, actual: 4 },
    { day: 'Tue', target: 6, actual: 6 },
    { day: 'Wed', target: 5, actual: 3 },
    { day: 'Thu', target: 8, actual: 7 },
    { day: 'Fri', target: 9, actual: 8 },
    { day: 'Sat', target: 4, actual: 2 },
    { day: 'Sun', target: 3, actual: 3 }
  ];

  const mockMonthlyData = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 85 },
    { month: 'Mar', value: 64 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 78 },
    { month: 'Jun', value: 88 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 60 },
    { month: 'Sep', value: 75 },
    { month: 'Oct', value: 82 },
    { month: 'Nov', value: 91 },
    { month: 'Dec', value: 98 }
  ];

  // SVG Line Chart Points generation for Completion Trends
  // Let's plot 7 points for a weekly trend line
  const points = [
    { x: 30, y: 120 },  // Mon
    { x: 80, y: 70 },   // Tue
    { x: 130, y: 95 },  // Wed
    { x: 180, y: 40 },  // Thu
    { x: 230, y: 25 },  // Fri
    { x: 280, y: 110 }, // Sat
    { x: 330, y: 65 }   // Sun
  ];

  // Convert points array to SVG path
  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-display">
          Analytics
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          Monitor your productivity patterns, completion velocities, and active status distributions.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background details */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-2xl opacity-50 pointer-events-none translate-x-20 -translate-y-10" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-indigo-700 rounded-full blur-2xl opacity-45 pointer-events-none -translate-x-20 translate-y-10" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1 bg-indigo-500/30 text-indigo-100 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Performance Summary
          </div>
          <h2 className="text-xl font-bold font-display">Keep it up! Your completion rate is excellent</h2>
          <p className="text-sm text-indigo-100 max-w-lg leading-relaxed">
            You've completed <span className="font-bold text-white">{completedTasks}</span> tasks out of <span className="font-bold text-white">{totalTasks}</span> assignments across your active projects.
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0 relative z-10">
          <div className="bg-white/10 px-4 py-3 rounded-lg border border-white/10 text-center">
            <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Completion Rate</p>
            <p className="text-3xl font-extrabold font-display">{completionRate}%</p>
          </div>
          <div className="bg-white/10 px-4 py-3 rounded-lg border border-white/10 text-center">
            <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Milestone Badge</p>
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold font-display text-lg">
              <Award className="w-5 h-5 text-amber-300" />
              <span>{completionRate > 80 ? 'Elite' : completionRate > 50 ? 'Achiever' : 'Active'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Progress charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Task Velocity
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Comparing expected target versus actual completed tasks</p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-slate-50 dark:bg-slate-850 p-0.5 rounded-lg border border-slate-100 dark:border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'weekly'
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-205'
                  }`}
                >
                  Weekly View
                </button>
                <button
                  onClick={() => setActiveTab('monthly')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === 'monthly'
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-205'
                  }`}
                >
                  Monthly Target
                </button>
              </div>
            </div>

            {/* Render Weekly View */}
            {activeTab === 'weekly' && (
              <div className="space-y-6">
                <div className="grid grid-cols-7 gap-4 h-48 items-end px-2 pt-4">
                  {mockWeeklyData.map((item, idx) => {
                    const targetHeight = (item.target / 10) * 100;
                    const actualHeight = (item.actual / 10) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                        {/* Side by side bars */}
                        <div className="flex items-end justify-center gap-1.5 w-full h-full max-h-[80%]">
                          {/* Target bar */}
                          <div className="w-3 sm:w-4 bg-slate-100 dark:bg-slate-800 rounded-t h-full flex items-end">
                            <div 
                              className="w-full bg-slate-300 dark:bg-slate-700 rounded-t hover:bg-slate-400 transition-all duration-300"
                              style={{ height: `${targetHeight}%` }}
                              title={`Target: ${item.target}`}
                            />
                          </div>
                          {/* Actual bar */}
                          <div className="w-3 sm:w-4 bg-indigo-100 dark:bg-indigo-950/30 rounded-t h-full flex items-end">
                            <div 
                              className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-all duration-300"
                              style={{ height: `${actualHeight}%` }}
                              title={`Actual: ${item.actual}`}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Legend */}
                <div className="flex justify-center gap-6 pt-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-xs" />
                    <span>Target Target</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-indigo-500 rounded-xs" />
                    <span>Actual Completed</span>
                  </div>
                </div>
              </div>
            )}

            {/* Render Monthly View */}
            {activeTab === 'monthly' && (
              <div className="grid grid-cols-12 gap-2 h-48 items-end px-1 pt-4">
                {mockMonthlyData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-3 bg-slate-100 dark:bg-slate-800 rounded-t h-full max-h-[80%] flex items-end">
                      <div 
                        className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-t transition-all duration-500" 
                        style={{ height: `${item.value}%` }}
                        title={`${item.month}: ${item.value}%`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{item.month}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Completion Trends Chart (Line Chart Visual) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Completion Trend Line
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Velocity performance trajectory over the last week</p>
            </div>

            {/* SVG Line Chart Graph */}
            <div className="relative pt-6">
              <svg viewBox="0 0 360 160" className="w-full h-auto overflow-visible">
                {/* Horizontal Guide lines */}
                <line x1="30" y1="25" x2="330" y2="25" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="4" />
                <line x1="30" y1="70" x2="330" y2="70" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="4" />
                <line x1="30" y1="110" x2="330" y2="110" stroke="#f1f5f9" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="4" />
                <line x1="30" y1="150" x2="330" y2="150" stroke="#e2e8f0" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />

                {/* Y-Axis Label Texts */}
                <text x="10" y="30" className="text-[9px] font-bold fill-slate-300 dark:fill-slate-600">100%</text>
                <text x="10" y="75" className="text-[9px] font-bold fill-slate-300 dark:fill-slate-600">50%</text>
                <text x="10" y="115" className="text-[9px] font-bold fill-slate-300 dark:fill-slate-600">20%</text>
                <text x="10" y="153" className="text-[9px] font-bold fill-slate-300 dark:fill-slate-600">0%</text>

                {/* Graph Fill Area */}
                <path d={areaD} fill="url(#lineGradient)" opacity="0.15" />
                
                {/* Graph Main Path Line */}
                <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Circles for Points */}
                {points.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r="4.5"
                    fill="#ffffff"
                    className="dark:fill-slate-900"
                    stroke="#6366f1"
                    strokeWidth="3"
                    className="cursor-pointer hover:r-[6.5] transition-all"
                  />
                ))}

                {/* Gradients declaration */}
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between pl-7 pr-[18px] mt-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

        </div>

        {/* Column 3: Priority distribution & Stats */}
        <div className="space-y-6">
          
          {/* Priority Breakdown (PieChart Visual) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <div className="mb-6">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Priority Distributions
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Breakdown of tasks based on priority</p>
            </div>

            {totalTasks > 0 ? (
              <div className="space-y-6">
                {/* Custom Stacked Progress Meter */}
                <div className="flex h-5 w-full rounded-full overflow-hidden border border-white dark:border-slate-800">
                  <div 
                    className="bg-red-500 h-full hover:opacity-90 transition-opacity"
                    style={{ width: `${(highPriority.length / totalTasks) * 100}%` }}
                    title={`High: ${highPriority.length}`}
                  />
                  <div 
                    className="bg-amber-500 h-full hover:opacity-90 transition-opacity"
                    style={{ width: `${(medPriority.length / totalTasks) * 100}%` }}
                    title={`Medium: ${medPriority.length}`}
                  />
                  <div 
                    className="bg-blue-500 h-full hover:opacity-90 transition-opacity"
                    style={{ width: `${(lowPriority.length / totalTasks) * 100}%` }}
                    title={`Low: ${lowPriority.length}`}
                  />
                </div>

                {/* Priority Row List details */}
                <div className="space-y-4">
                  {/* High */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                        <span>High Priority</span>
                      </div>
                      <span>{highPriority.length} Tasks ({highComp} Done)</span>
                    </div>
                    <ProgressBar 
                      value={highPriority.length > 0 ? Math.round((highComp / highPriority.length) * 100) : 0} 
                      size="sm" 
                    />
                  </div>

                  {/* Medium */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                        <span>Medium Priority</span>
                      </div>
                      <span>{medPriority.length} Tasks ({medComp} Done)</span>
                    </div>
                    <ProgressBar 
                      value={medPriority.length > 0 ? Math.round((medComp / medPriority.length) * 100) : 0} 
                      size="sm" 
                    />
                  </div>

                  {/* Low */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                        <span>Low Priority</span>
                      </div>
                      <span>{lowPriority.length} Tasks ({lowComp} Done)</span>
                    </div>
                    <ProgressBar 
                      value={lowPriority.length > 0 ? Math.round((lowComp / lowPriority.length) * 100) : 0} 
                      size="sm" 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                No tasks available for priority analytics.
              </div>
            )}
          </div>

          {/* Productivity tips */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-premium">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">Productivity Recommendations</h4>
            </div>
            <ul className="text-xs text-slate-505 dark:text-slate-400 space-y-2.5 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">1.</span>
                <span>Focus on completing <b>High Priority</b> items first. High priority tasks currently show a <b>{highPriority.length > 0 ? Math.round((highComp / highPriority.length) * 100) : 0}%</b> resolution speed.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2.</span>
                <span>Keep tasks small. Break down large tasks by adding <b>Subtasks</b> to improve progress visibility.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">3.</span>
                <span>Clean up overdue tasks. Regularly adjust due dates or mark completed to maintain clean workspaces.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
