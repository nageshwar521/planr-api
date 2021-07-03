const faunadb = require("faunadb");
const uuid = require("uuid");
const format = require("date-fns/format");
const { dbDateFormat, faunadbClient } = require("../config");

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
  Update,
} = faunadb.query;

const create = async (taskItem) => {
  const id = uuid.v4();

  const newTask = {
    ...taskItem,
    dateCreated: format(new Date(), dbDateFormat),
    dateModified: format(new Date(), dbDateFormat),
    id,
  };
  return faunadbClient.query(Create(Collection("tasks"), { data: newTask }));
};

const update = (taskItem) => {
  const updatedTask = {
    ...taskItem,
    dateModified: format(new Date(), dbDateFormat),
  };

  // console.log("update updatedTask");
  // console.log(updatedTask);

  return faunadbClient.query(
    Update(Ref(Collection("tasks"), taskItem.id), {
      data: updatedTask,
    })
  );
};

const find = (id) => {
  return faunadbClient.query(Get(Ref(Collection("tasks"), id)));
};

const findAll = () => {
  return faunadbClient.query(
    Map(
      Paginate(Documents(Collection("tasks"))),
      Lambda("taskRef", Call(Fn("GetTask"), Select(["id"], Var("taskRef"))))
    )
  );
};

const remove = (id) => {
  return faunadbClient.query(Delete(Ref(Collection("tasks"), id)));
};

module.exports = {
  create,
  update,
  find,
  findAll,
  remove,
};
