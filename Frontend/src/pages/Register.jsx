import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AlertCircle } from 'lucide-react';
import { registerUser } from '../axios/api/auth.api.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { values , handleSubmit , handleChange } = useFormik({
    initialValues : {
      name : "",
      email : '',
      password : '',
      confirmPassword : ''
    },
    onSubmit : async (values) => {
      console.log(values)
      const res = await register(values);

      console.log(res)
      console.log("user registered...")
    }
  })

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!name || !email || !password || !confirmPassword) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     setError('Password must be at least 6 characters long');
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate small latency for premium feel
  //   setTimeout(() => {
  //     const res = register(name, email, password);
  //     setIsLoading(false);
  //     if (res.success) {
  //       navigate('/dashboard');
  //     } else {
  //       setError(res.message || 'Registration failed');
  //     }
  //   }, 600);
  // };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-display">
          Create a new account
        </h3>
        <p className="mt-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
          Or{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            sign in to your existing account
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
          label="Full Name"
          type="text"
          placeholder="John Doe"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          name="email"
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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
