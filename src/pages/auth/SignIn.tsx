import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@yafitechbd.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@yafitechbd.com' && password === 'demo') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try demo@yafitechbd.com / demo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-surface border border-theme">
        <h2 className="text-2xl font-bold mb-6 text-center text-theme">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-theme">Email</label>
            <input 
              type="text" 
              id="email" 
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 sm:text-sm form-input" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-theme">Password</label>
            <input 
              type="password" 
              id="password" 
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 sm:text-sm form-input" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                className="h-4 w-4 rounded focus:ring-2 focus:ring-primary-500 form-input" 
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-theme">Remember me</label>
            </div>
            <a href="/auth/forgot-password" className="text-sm hover:underline text-primary">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-full"
          >
            Sign In
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-theme" />
          <span className="mx-4 text-secondary">or</span>
          <div className="flex-grow border-t border-theme" />
        </div>
        <div className="space-y-2">
          <button 
            className="w-full flex items-center justify-center border rounded-md py-2 hover:bg-gray-50 transition-colors bg-surface border-theme text-theme"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
          <button 
            className="w-full flex items-center justify-center border rounded-md py-2 hover:bg-gray-50 transition-colors bg-surface border-theme text-theme"
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-5 w-5 mr-2" />
            Sign in with GitHub
          </button>
          <button 
            className="w-full flex items-center justify-center border rounded-md py-2 hover:bg-gray-50 transition-colors bg-surface border-theme text-theme"
          >
            {/* Microsoft SVG icon */}
            <span className="h-5 w-5 mr-2 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="8" height="8" fill="#F35325"/>
                <rect x="11" y="1" width="8" height="8" fill="#81BC06"/>
                <rect x="1" y="11" width="8" height="8" fill="#05A6F0"/>
                <rect x="11" y="11" width="8" height="8" fill="#FFBA08"/>
              </svg>
            </span>
            Sign in with Microsoft
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-secondary">
          Don&apos;t have an account? <a href="/auth/signup" className="hover:underline text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
} 