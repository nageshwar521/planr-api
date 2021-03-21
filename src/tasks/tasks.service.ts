/**
 * Data Model Interfaces
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
import addDays from 'date-fns/addDays';
import { Task } from './task.interface';
import { Tasks } from './tasks.interface';
import { v4 as uuidv4 } from 'uuid';
import getUnixTime from 'date-fns/getUnixTime';

/**
 * In-Memory Store
 */

const adapter = new FileSync('../../db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ tasks: [] }).write();

/**
 * Service Methods
 */

export const findAll = async (): Promise<Tasks> => {
  return db
    .get('tasks')
    .sort((a: Task, b: Task) => {
      return (
        getUnixTime(new Date(b.dateCreated)) -
        getUnixTime(new Date(a.dateCreated))
      );
    })
    .value();
};

export const find = async (id: number): Promise<Task> => {
  const record: Task = db.get('tasks').find({ id }).value();

  if (record) {
    return record;
  }

  throw new Error('No record found!');
};

export const create = async (taskItem: Task): Promise<void> => {
  const id: string = uuidv4();

  const newTask = {
    ...taskItem,
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  db.get('tasks').push(newTask).write();
};

export const update = async (updatedTask: Task): Promise<void> => {
  const oldTask = db.get('tasks').find({ id: updatedTask.id });
  if (oldTask) {
    oldTask
      .assign(updatedTask, {
        dateModified: new Date(),
      })
      .write();
    return;
  }

  throw new Error('No record found to update');
};

export const remove = async (id: string): Promise<void> => {
  const record: Task = db.get('tasks').find({ id }).value();

  if (record) {
    db.get('tasks').remove({ id }).write();
    return;
  }

  throw new Error('No record found to delete');
};
