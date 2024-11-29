import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import PermissionList from './components/PermissionList';
import { Menu } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
        >
          <Menu size={24} />
        </button>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-50 lg:z-0`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="h-full">
            <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu */}
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/permissions" element={<PermissionList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;