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

const create = async (taskItem) => {
  const id = uuid.v4();

  const newTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  return await client.query(Create(Collection('tasks'), { data: newTask }));
};

const update = async (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateModified: new Date(),
  };
  return await client.query(
    Update(Ref(Collection('tasks'), taskItem.id), {
      data: updatedTask,
    })
  );
};

const find = async (id) => {
  return await client.query(Get(Ref(Collection('tasks'), id)));
};

const findAll = async () => {
  return await client.query(
    Paginate(
      Match(
        Index('tasks_by_username'),
        Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521')))
      )
    )
  );
};

const remove = async (id) => {
  return await client.query(Delete(Ref(Collection('tasks'), id)));
};
module.exports = {
  create,
  update,
  find,
  findAll,
  remove,
};
