import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  Bell, 
  Palette, 
  ShieldCheck, 
  Lock, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function Settings() {
  // Notification states
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setSaveSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
          Settings
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          Customize notifications preferences, security parameters, and application look-and-feel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Navigation/Category Layout on Left */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notifications Panel */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <Bell className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 font-display">Notifications Settings</h3>
                <p className="text-xs text-slate-400">Choose when and how you want to be alerted</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="emailNotify" className="text-sm font-bold text-slate-700">Email Notifications</label>
                  <p className="text-xs text-slate-400">Receive summaries, task reports, and milestones alerts.</p>
                </div>
                <button
                  type="button"
                  id="emailNotify"
                  onClick={() => setEmailNotify(!emailNotify)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    emailNotify ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotify ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="pushNotify" className="text-sm font-bold text-slate-700">Desktop Push Alerts</label>
                  <p className="text-xs text-slate-400">Get instant alerts on screen when due dates approach.</p>
                </div>
                <button
                  type="button"
                  id="pushNotify"
                  onClick={() => setPushNotify(!pushNotify)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    pushNotify ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushNotify ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="weeklyDigest" className="text-sm font-bold text-slate-700">Weekly Progress Digest</label>
                  <p className="text-xs text-slate-400">Receive a weekly productivity report on Sunday evening.</p>
                </div>
                <button
                  type="button"
                  id="weeklyDigest"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    weeklyDigest ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    weeklyDigest ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Account Security Password Reset */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <Lock className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800 font-display">Security Settings</h3>
                <p className="text-xs text-slate-400">Update password details for account security</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg animate-fade-in">
                Password updated successfully (Simulated).
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm">
                  Change Password
                </Button>
              </div>
            </form>
          </div>

        </div>

        {/* Side Preferences Column */}
        <div className="space-y-6">
          {/* Theme Preferences */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800 font-display">Theme Preference</h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              TaskFlow currently runs exclusively on Light theme to maintain Notion & ClickUp design coherence.
            </p>

            <div className="flex items-center gap-3">
              <button 
                type="button" 
                className="flex-1 py-3 px-4 rounded-xl border-2 border-indigo-600 bg-white flex flex-col items-center gap-2 cursor-default transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 shadow-xs flex items-center justify-center text-xs font-bold text-slate-700">Ab</div>
                <span className="text-xs font-bold text-slate-800">Light Theme</span>
              </button>

              <button 
                type="button" 
                disabled 
                className="flex-1 py-3 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center gap-2 opacity-50 cursor-not-allowed"
                title="Theme locked by design requirement"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-center text-xs font-bold text-slate-400">Ab</div>
                <span className="text-xs font-bold text-slate-400">Dark Theme</span>
              </button>
            </div>
          </div>

          {/* Workspace Info Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-premium space-y-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-bold text-slate-800 font-display">System Integrity</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              TaskFlow is executing in **Frontend-Only** sandbox mode. All workspace databases modifications are stored in your browser's persistent Local Storage.
            </p>
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-400 font-mono">
              Database storage: localStorage
              <br />
              Status: Connected (Local)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
