import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  FolderKanban, 
  ListTodo, 
  BarChart3, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function Landing() {
  const { currentUser } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is TaskFlow really free?",
      a: "Yes! TaskFlow is a frontend-only project management application that runs completely in your browser. There are no fees or registration requirements for the basic sandbox."
    },
    {
      q: "Where is my project data stored?",
      a: "Your data is stored securely in your browser's Local Storage database. It never leaves your computer, meaning your workspace is completely private."
    },
    {
      q: "Can I connect a backend server later?",
      a: "Absolutely. TaskFlow's codebase is architected to match modern Mongoose schemas (Users, Projects, Tasks, Subtasks). Connecting an API using axios or fetch in the future is straightforward."
    },
    {
      q: "Does it support mobile devices?",
      a: "Yes, TaskFlow is designed to be fully responsive, scaling smoothly from large desktop displays to mobile phones and tablets."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 selection:bg-indigo-500 selection:text-white relative">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-1/4 w-[500px] h-[500px] bg-slate-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">
              TaskFlow
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
              >
                Go to Workspace <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100/50 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Public Beta Sandbox
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 tracking-tight font-display leading-[1.1] max-w-3xl mx-auto">
            Streamline your project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">workspaces</span> in one place
          </h1>

          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Plan, organize, and track your projects, tasks, and collapsible subtasks effortlessly. A clean, beautiful local workspace designed to elevate your daily productivity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-all shadow-md"
              >
                Open Dashboard Panel <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-all shadow-md"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-6 py-3 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 font-bold border border-slate-200 rounded-lg text-sm transition-all shadow-xs"
                >
                  Try Demo login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Simulated Interface Preview */}
      <section className="px-6 py-6 max-w-5xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-premium relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Mock SaaS Panel Frame */}
          <div className="border border-slate-200/60 rounded-xl overflow-hidden shadow-xs flex flex-col bg-slate-50/50">
            {/* Header window control bar */}
            <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200/50 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="ml-4 h-4 bg-slate-200/60 rounded w-48 animate-pulse" />
            </div>

            {/* Content Mock layout */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">TaskFlow app</span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">66%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-700 font-display">Development phase</h4>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-500 rounded-full" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Marketing Q3</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">50%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-700 font-display">Ads Creative Drafts</h4>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">App wireframes</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">100%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-700 font-display">Figma Wireframes</h4>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 font-display tracking-tight">
            Engineered for high performance productivity
          </h2>
          <p className="text-sm text-slate-400 font-semibold max-w-md mx-auto">
            Everything you need to handle massive workloads without hitting structural clutter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 w-fit">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">Workspaces & Projects</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Create clean workspaces for separate initiatives, keep items grouped by domain, and track overarching completion progress instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 w-fit">
              <ListTodo className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">Granular Subtasks</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Break tasks down into executable micro-items. Toggle and edit subtasks inline with collapsible folders, updating progress states automatically.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">Performance Analytics</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Visualize completion velocities, daily progress metrics, weekly charts, and priority distributions with lightweight native SVG graphics.
            </p>
          </div>
        </div>
      </section>

      {/* Local Storage Banner */}
      <section className="bg-white border-y border-slate-100 py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-slate-800 font-display">Protected by Local Storage</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                TaskFlow operates in your browser's sandboxed local database. No cloud data leakage, no corporate trackers. Your private project plans stay on your local disk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 font-display tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="text-sm text-slate-400 font-semibold max-w-sm mx-auto">
            Get started for free or upgrade as your team operations expand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-premium space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Sandbox</p>
              <h3 className="text-4xl font-extrabold text-slate-800 font-display">$0 <span className="text-sm text-slate-400 font-normal">/ lifetime</span></h3>
              <p className="text-sm text-slate-500">Perfect for single developers, students, and local organizers.</p>
              
              <ul className="text-xs text-slate-500 space-y-2.5 pt-4">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Unlimited Projects</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Unlimited Tasks & Subtasks</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Local Storage Database</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> SVG Productivity Analytics</li>
              </ul>
            </div>

            <Link
              to="/register"
              className="block w-full py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-white p-8 rounded-xl border-2 border-indigo-600 shadow-premium space-y-6 flex flex-col justify-between relative">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Popular
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Team Server</p>
              <h3 className="text-4xl font-extrabold text-slate-800 font-display">$8 <span className="text-sm text-slate-400 font-normal">/ user / mo</span></h3>
              <p className="text-sm text-slate-500">Best for collaborative teams, startups, and agile syncs.</p>
              
              <ul className="text-xs text-slate-500 space-y-2.5 pt-4">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Everything in Free</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Team Cloud Synchronization</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Role-based Member Permissions</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Slack & GitHub API Integrations</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Priority Support SLA</li>
              </ul>
            </div>

            <Link
              to="/register"
              className="block w-full py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              Sign Up For Trial
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 font-semibold max-w-sm mx-auto">
            Quick responses to common questions about TaskFlow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-700 hover:text-indigo-600 transition-colors text-sm"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              
              {expandedFaq === idx && (
                <div className="px-6 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-2 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-6 text-center text-xs text-slate-400 font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-indigo-500" />
            <span>TaskFlow &copy; {new Date().getFullYear()} Shivam Choudhary. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#pricing" className="hover:text-slate-600">Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
