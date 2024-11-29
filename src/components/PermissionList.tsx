import React from 'react';
import { useStore } from '../store/useStore';

const PermissionList = () => {
  const { permissions } = useStore();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Permissions</h2>
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {permission.name}
                  </span>
                </td>
                <td className="px-6 py-4">{permission.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionList;