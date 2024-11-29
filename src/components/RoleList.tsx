import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Role } from '../types';
import { Edit2, Trash2, ShieldPlus } from 'lucide-react';

const RoleList = () => {
  const { roles, permissions, addRole, updateRole, deleteRole } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      updateRole(editingRole.id, formData);
      setEditingRole(null);
    } else {
      addRole(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', description: '', permissions: [] });
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <ShieldPlus size={20} />
          <span>Add Role</span>
        </button>
      </div>

      {(isAdding || editingRole) && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {permissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="rounded border-gray-300"
                    />
                    <span>{permission.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingRole ? 'Update' : 'Add'} Role
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingRole(null);
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permId) => (
                      <span
                        key={permId}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {permissions.find((p) => p.id === permId)?.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingRole(role);
                        setFormData({
                          name: role.name,
                          description: role.description,
                          permissions: role.permissions,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteRole(role.id)}
                      className="text-red-600 hover:text-red-900"
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

export default RoleList;