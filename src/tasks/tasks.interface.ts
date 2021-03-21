// src/tasks/tasks.interface.ts

import { Task } from './task.interface';

export type Tasks = {
  [index: string]: Task;
};
