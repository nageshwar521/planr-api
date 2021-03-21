import ApiRequest from './ApiRequest';
import {endpoints} from './endpoints';

export const loginApi = async (payload) => {
  return await ApiRequest.post(endpoints.login, payload);
};

export const registerApi = async (payload) => {
  return await ApiRequest.post(endpoints.register, payload);
};

export const getAllPlansApi = async () => {
  return await ApiRequest.get(endpoints.allPlans);
};

export const getPlanDetailsApi = async (id) => {
  return await ApiRequest.get(endpoints.planDetails, {id});
};

export const addPlanApi = async (payload) => {
  return await ApiRequest.get(endpoints.addPlan, payload);
};

export const updatePlanApi = async (payload) => {
  return await ApiRequest.get(endpoints.updatePlan, payload);
};

export const deletePlanApi = async (id) => {
  return await ApiRequest.get(endpoints.deletePlan, {id});
};
