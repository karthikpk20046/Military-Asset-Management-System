import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
          <Shield size={32} className="text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          {user ? (
            <>
              Sorry, your role <strong>{user.role}</strong> does not have permission to access this page.
            </>
          ) : (
            'You do not have permission to access this page.'
          )}
        </p>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            icon={<ArrowLeft size={16} />}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;