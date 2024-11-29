import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User } from '../types';
import { Edit2, Trash2, UserPlus } from 'lucide-react';

const UserList = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, formData);
      setEditingUser(null);
    } else {
      addUser(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', email: '', role: '', status: 'active' });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pt-4 lg:pt-0">
        <h2 className="text-2xl font-bold text-gray-900 pl-12 sm:pl-0">Users</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
        >
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {(isAdding || editingUser) && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-xl shadow-lg animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
            >
              {editingUser ? 'Update' : 'Add'} User
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingUser(null);
              }}
              className="w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {roles.find((r) => r.id === user.role)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          role: user.role,
                          status: user.status,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;