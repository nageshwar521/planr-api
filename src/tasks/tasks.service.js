const faunadb = require('faunadb');
const uuid = require('uuid');
const { formatDate } = require('../utils/dateUtils');

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
} = faunadb.query;

const create = (taskItem) => {
  // console.log('taskItem');
  // console.log(taskItem);
  const id = uuid.v4();

  const user = Select(
    'ref',
    Get(Match(Index('user_by_username'), 'nageshwar521'))
  );

  // console.log('user');
  // console.log(user);
  const newTask = {
    ...taskItem,
    user: user,
    dateCreated: formatDate(new Date()),
    dateModified: formatDate(new Date()),
    id,
  };
  // console.log('newTask');
  // console.log(newTask);
  return client.query(Create(Collection('tasks'), { data: newTask }));
};

const update = (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateModified: formatDate(new Date()),
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
      Paginate(Match(Index('tasks_by_username'))),
      Lambda('x', Select(['title'], Get(Var('x'))))
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
