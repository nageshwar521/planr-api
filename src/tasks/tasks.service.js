const faunadb = require('faunadb');
const uuid = require('uuid');

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
} = faunadb.query;

const create = (taskItem) => {
  const id = uuid.v4();

  const newTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  return client.query(Create(Collection('tasks'), { data: newTask }));
};

const update = (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateModified: new Date(),
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
    Paginate(
      Match(
        Index('tasks_by_username'),
        Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521')))
      )
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
