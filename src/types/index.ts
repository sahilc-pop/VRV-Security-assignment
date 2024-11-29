export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}