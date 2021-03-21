/**
 * Data Model Interfaces
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
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

export const findAll = async () => {
  return db
    .get('tasks')
    .sort((a, b) => {
      return (
        getUnixTime(new Date(b.dateCreated)) -
        getUnixTime(new Date(a.dateCreated))
      );
    })
    .value();
};

export const find = async (id) => {
  const record = db.get('tasks').find({ id }).value();

  if (record) {
    return record;
  }

  throw new Error('No record found!');
};

export const create = async (taskItem) => {
  const id = uuidv4();

  const newTask = {
    ...taskItem,
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  db.get('tasks').push(newTask).write();
};

export const update = async (updatedTask) => {
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

export const remove = async (id) => {
  const record = db.get('tasks').find({ id }).value();

  if (record) {
    db.get('tasks').remove({ id }).write();
    return;
  }

  throw new Error('No record found to delete');
};
