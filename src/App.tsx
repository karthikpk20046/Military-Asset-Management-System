import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PurchasesPage from './pages/PurchasesPage';
import TransfersPage from './pages/TransfersPage';
import AssignmentsPage from './pages/AssignmentsPage';
import ExpendituresPage from './pages/ExpendituresPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route 
            path="/dashboard" 
            element={
              <Layout 
                title="Dashboard" 
                subtitle="Overview of asset inventory and movements"
              />
            }
          >
            <Route index element={<DashboardPage />} />
          </Route>
          
          <Route 
            path="/purchases" 
            element={
              <Layout 
                title="Purchases" 
                subtitle="Manage asset purchases and acquisition records"
              />
            }
          >
            <Route index element={<PurchasesPage />} />
          </Route>
          
          <Route 
            path="/transfers" 
            element={
              <Layout 
                title="Transfers" 
                subtitle="Manage asset transfers between bases"
              />
            }
          >
            <Route index element={<TransfersPage />} />
          </Route>
          
          <Route 
            path="/assignments" 
            element={
              <Layout 
                title="Assignments" 
                subtitle="Track equipment assignments to personnel"
              />
            }
          >
            <Route index element={<AssignmentsPage />} />
            <Route path="active" element={<AssignmentsPage />} />
            <Route path="history" element={<AssignmentsPage />} />
          </Route>
          
          <Route 
            path="/expenditures" 
            element={
              <Layout 
                title="Expenditures" 
                subtitle="Track consumed or expended assets"
                allowedRoles={['admin', 'baseCommander']}
              />
            }
          >
            <Route index element={<ExpendituresPage />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;