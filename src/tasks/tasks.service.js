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
    user: Call(Fn('getUser'), 'nageshwar521'),
    dateCreated: new Date(),
    dateModified: new Date(),
    id,
  };
  const doc = await client.query(
    Create(Collection('tasks'), { data: newTask })
  );
  return doc;
};

const update = async (taskItem) => {
  const updatedTask = {
    ...taskItem,
    user: Call(Fn('getUser'), 'nageshwar521'),
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
    return doc;
  }

  return 'No record found!';
};

const findAll = async () => {
  try {
    const docs = await client.query(
      Paginate(
        Match(Index('tasks_by_user'), Select("ref", Get(Match(Index("users_by_id"), "nageshwar521"))
      )
    );

    return docs;
  } catch (error) {
    return `Get All Error: ${JSON.stringify(error)}`;
  }
};

const remove = async (id) => {
  try {
    await client.query(Delete(Ref(Collection('tasks'), id)));

    return 'Delete success';
  } catch (error) {
    return `Delete Error: ${JSON.stringify(error)}`;
  }
};
module.exports = {
  create,
  update,
  find,
  findAll,
  remove,
};
