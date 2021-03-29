const faunadb = require('faunadb');
const uuid = require('uuid');
const { formatDate } = require('../utils/dateUtils');
const format = require('date-fns');
const { dateFormat } = require('../config');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
  Call,
  Function: Fn,
  Delete,
  Lambda,
  Var,
  Map,
  Documents,
} = faunadb.query;

const create = async (taskItem) => {
  // console.log('taskItem');
  // console.log(taskItem);
  const id = uuid.v4();

  // console.log('format(new Date(), dateFormat)');
  // console.log(format(new Date(), dateFormat));
  const newTask = {
    ...taskItem,
    user: 'nageshwar521',
    dateCreated: Date.now(),
    dateModified: Date.now(),
    id,
  };
  return client.query(Create(Collection('tasks'), { data: newTask }));
};

const update = (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: 'nageshwar521',
    dateModified: Date.now(),
  };
  return client.query(
    Update(Ref(Collection('tasks'), taskItem.id), {
      data: updatedTask,
    })
  );
};

const find = (id) => {
  return client.query(Get(Ref(Collection('tasks'), id)));
};

const findAll = () => {
  return client.query(
    Map(
      Paginate(Documents(Collection('tasks'))),
      Lambda('taskRef', Call(Fn('GetTask'), Select(['id'], Var('taskRef'))))
    )
  );
};

const remove = (id) => {
  return client.query(Delete(Ref(Collection('tasks'), id)));
};

module.exports = {
  create,
  update,
  find,
  findAll,
  remove,
};
