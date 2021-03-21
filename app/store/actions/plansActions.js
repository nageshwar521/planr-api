import {getAllPlansApi} from 'app/services/ApiService';

const {createAction} = require('@reduxjs/toolkit');
const {actionTypes} = require('../actionTypes');

const getAllPlansRequest = createAction(actionTypes.GET_ALL_PLANS_REQUEST);
const getAllPlansSuccess = createAction(actionTypes.GET_ALL_PLANS_SUCCESS);
const getAllPlansError = createAction(actionTypes.GET_ALL_PLANS_ERROR);

export const getAllPlans = () => {
  return async (dispatch, getState) => {
    dispatch(getAllPlansRequest());

    try {
      const response = await getAllPlansApi();
      console.log('getAllPlans response');
      console.log(response);
    } catch (error) {
      console.log('getAllPlans error');
      console.log(error);
    }
  };
};

const addPlanRequest = createAction(actionTypes.ADD_PLAN_REQUEST);
const addPlanSuccess = createAction(actionTypes.ADD_PLAN_SUCCESS);
const addPlanError = createAction(actionTypes.ADD_PLAN_ERROR);

export const addPlan = (payload) => {
  return async (dispatch, getState) => {
    dispatch(addPlanRequest());

    try {
      const response = await addPlanApi(payload);
      console.log('addPlan response');
      console.log(response);
    } catch (error) {
      console.log('addPlan error');
      console.log(error);
    }
  };
};

const updatePlanRequest = createAction(actionTypes.UPDATE_PLAN_REQUEST);
const updatePlanSuccess = createAction(actionTypes.UPDATE_PLAN_SUCCESS);
const updatePlanError = createAction(actionTypes.UPDATE_PLAN_ERROR);

export const updatePlan = (payload) => {
  return async (dispatch, getState) => {
    dispatch(updatePlanRequest());

    try {
      const response = await updatePlanApi(payload);
      console.log('updatePlan response');
      console.log(response);
    } catch (error) {
      console.log('updatePlan error');
      console.log(error);
    }
  };
};

const deletePlanRequest = createAction(actionTypes.DELETE_PLAN_REQUEST);
const deletePlanSuccess = createAction(actionTypes.DELETE_PLAN_SUCCESS);
const deletePlanError = createAction(actionTypes.DELETE_PLAN_ERROR);

export const deletePlan = (payload) => {
  return async (dispatch, getState) => {
    dispatch(deletePlanRequest());

    try {
      const response = await deletePlanApi(payload);
      console.log('deletePlan response');
      console.log(response);
    } catch (error) {
      console.log('deletePlan error');
      console.log(error);
    }
  };
};
