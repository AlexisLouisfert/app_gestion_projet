export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'po' | 'sm' | 'leader' | 'participant';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  leader? : string;
  scrumMaster? : string;
  productOwner? : string;
  participants? : number;
  sprints?: number;
  stories?: number;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface Story {
  id: string;
  name: string;
  description: string;
  tasks?: Task[];
}

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'active' | 'completed';
}