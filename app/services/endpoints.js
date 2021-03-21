export const endpoints = {
  login: {path: '/login', method: 'post'},
  register: {path: '/register', method: 'post'},
  refreshToken: {path: '/refreshToken', method: 'post'},
  allPlans: {path: '/plans', method: 'get'},
  planDetails: {path: '/plans/{id}', method: 'get'},
  addPlan: {path: '/plans', method: 'post'},
  updatePlan: {path: '/plans/{id}', method: 'put'},
  deletePlan: {path: '/plans/{id}', method: 'delete'},
};
