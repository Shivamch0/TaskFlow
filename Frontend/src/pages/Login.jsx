import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values , handleChange , handleSubmit} = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    onSubmit : async (values) => {

    }
  })

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!email || !password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate small latency for premium feel
  //   setTimeout(() => {
  //     const res = login(email, password);
  //     setIsLoading(false);
  //     if (res.success) {
  //       navigate('/dashboard');
  //     } else {
  //       setError(res.message || 'Invalid credentials');
  //     }
  //   }, 600);
  // };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">
          Sign in to your account
        </h3>
        <p className="mt-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
          Or{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 text-xs font-medium flex items-start gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          name='email'
          value={values.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          name='password'
          value={values.password}
          onChange={handleChange}
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
      <div className="p-3 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-400 text-xs">
        <p className="font-bold text-slate-600 dark:text-slate-300 mb-1">💡 Demo Credentials:</p>
        <p>Email: <span className="font-mono font-semibold text-slate-700 dark:text-slate-200 select-all">test@example.com</span></p>
        <p>Password: <span className="font-mono font-semibold text-slate-700 dark:text-slate-200 select-all">password123</span></p>
      </div>
    </div>
  );
}
