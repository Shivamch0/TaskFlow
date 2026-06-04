import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate small latency for premium feel
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 font-display">
          Sign in to your account
        </h3>
        <p className="mt-1.5 text-xs font-semibold text-slate-400">
          Or{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-100 rounded-lg text-red-700 text-xs font-medium flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Mock login tip */}
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 text-xs">
        <p className="font-bold text-slate-600 mb-1">💡 Demo Credentials:</p>
        <p>Email: <span className="font-mono font-semibold text-slate-700 select-all">test@example.com</span></p>
        <p>Password: <span className="font-mono font-semibold text-slate-700 select-all">password123</span></p>
      </div>
    </div>
  );
}
