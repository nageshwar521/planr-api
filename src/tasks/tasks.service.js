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
  try {
    const doc = await client.query(
      Create(Collection('tasks'), { data: newTask })
    );
    return Promise.resolve(doc);
  } catch (error) {
    return Promise.reject(`Create error: ${JSON.stringify(error)}`);
  }
};

const update = async (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521'))),
    dateModified: new Date(),
  };
  try {
    await client.query(
      Update(Ref(Collection('tasks'), taskItem.id), {
        data: updatedTask,
      })
    );
    return 'Update success';
  } catch (error) {
    return `Update Error: ${JSON.stringify(error)}`;
  }
};

const find = async (id) => {
  const doc = await client.query(Get(Ref(Collection('tasks'), id)));

  if (doc) {
    return Promise.resolve(doc);
  }

  return Promise.reject('No record found!');
};

const findAll = async () => {
  try {
    const docs = await client.query(
      Paginate(
        Match(
          Index('tasks_by_username'),
          Select('ref', Get(Match(Index('users_by_username'), 'nageshwar521')))
        )
      )
    );

    return Promise.resolve(docs);
  } catch (error) {
    return Promise.reject(`Get All Error: ${JSON.stringify(error)}`);
  }
};

const remove = async (id) => {
  try {
    await client.query(Delete(Ref(Collection('tasks'), id)));

    return Promise.resolve('Delete success');
  } catch (error) {
    return Promise.reject(`Delete Error: ${JSON.stringify(error)}`);
  }
};
module.exports = {
  create,
  update,
  find,
  findAll,
  remove,
};
