/**
 * Data Model Interfaces
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid');
const getUnixTime = require('date-fns/getUnixTime');

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

var findAll = async () => {
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

var find = async (id) => {
  const record = db.get('tasks').find({ id }).value();

  if (record) {
    return record;
  }

  throw new Error('No record found!');
};

var create = async (taskItem) => {
  const id = uuid.v4();

  const newTask = {
    ...taskItem,
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  db.get('tasks').push(newTask).write();
};

var update = async (updatedTask) => {
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

var remove = async (id) => {
  const record = db.get('tasks').find({ id }).value();

  if (record) {
    db.get('tasks').remove({ id }).write();
    return;
  }

  throw new Error('No record found to delete');
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
