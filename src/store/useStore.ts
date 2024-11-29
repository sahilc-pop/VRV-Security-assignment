import { create } from 'zustand';
import { User, Role, Permission } from '../types';
import { generateId } from '../lib/utils';

interface Store {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

const defaultPermissions: Permission[] = [
  { id: '1', name: 'read', description: 'Can read data' },
  { id: '2', name: 'write', description: 'Can create and edit data' },
  { id: '3', name: 'delete', description: 'Can delete data' },
  { id: '4', name: 'manage_users', description: 'Can manage users' },
  { id: '5', name: 'manage_roles', description: 'Can manage roles' },
];

const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['1', '2', '3', '4', '5'],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Can manage users and view roles',
    permissions: ['1', '2', '3', '4'],
  },
  {
    id: 'user',
    name: 'Regular User',
    description: 'Basic access',
    permissions: ['1', '2'],
  },
];

export const useStore = create<Store>((set) => ({
  users: [],
  roles: defaultRoles,
  permissions: defaultPermissions,

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, { ...user, id: generateId() }],
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, { ...role, id: generateId() }],
    })),

  updateRole: (id, updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      ),
    })),

  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));