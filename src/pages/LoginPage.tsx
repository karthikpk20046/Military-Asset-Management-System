import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock } from 'lucide-react';
import { Input } from '../components/ui/FormElements';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Demo users for quick login
  const demoUsers = [
    { email: 'general.smith@military.gov', role: 'Admin' },
    { email: 'colonel.johnson@military.gov', role: 'Base Commander' },
    { email: 'captain.wilson@military.gov', role: 'Logistics Officer' }
  ];
  
  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword('demo123');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#0F3460] p-6 flex items-center justify-center">
            <div className="text-white text-center">
              <Shield size={40} className="mx-auto mb-2" />
              <h1 className="text-2xl font-bold">MilAsset</h1>
              <p className="text-sm opacity-75">Military Asset Management System</p>
            </div>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                icon={<User size={16} className="text-gray-400" />}
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                icon={<Lock size={16} className="text-gray-400" />}
              />
              
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                className="mt-2"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
            
            <div className="mt-6">
              <p className="text-sm text-center text-gray-500 mb-2">Demo Accounts</p>
              <div className="space-y-2">
                {demoUsers.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => handleDemoLogin(user.email)}
                    className="w-full p-2 text-left text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium">{user.role}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">
                Use any password for demo accounts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;