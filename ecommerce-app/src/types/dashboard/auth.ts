export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  groups: string[];
  permissions: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;

  refresh: string;

  user: User;
}
