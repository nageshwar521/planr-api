// src/tasks/task.interface.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  images: string[];
  isCompleted: boolean;
  targetDate: Date;
  completedDate: Date | null;
  dateCreated: Date;
  dateModified: Date;
  addedBy: string | null;
}
