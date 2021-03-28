//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

const express = require('express');
const tasksService = require('./tasks.service');
const { uploadFile } = require('../common/uploadFile.middleware');
const {
  generateErrorResponse,
  generateSuccessResponse,
} = require('../utils/generateResponse');

//
// ─── ROUTER DEFINITION ──────────────────────────────────────────────────────────
//

var tasksRouter = express.Router();

//
// ─── CONTROLLER DEFINITIONS ─────────────────────────────────────────────────────
//

//
// ─── GET TASKS ──────────────────────────────────────────────────────────────────
//

tasksRouter.get('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    const tasks = await tasksService.findAll();
    console.log('tasks');
    console.log(JSON.stringify(tasks, '', 2));

    res.status(200).send(generateSuccessResponse(tasks));
  } catch (error) {
    res
      .status(404)
      .send(generateErrorResponse({ message: 'Something went wrong!', error }));
  }
});

//
// ─── GET TASKS:ID ───────────────────────────────────────────────────────────────
//

tasksRouter.get('/', async (req, res) => {
  try {
    const task = await tasksService.find(req.body.id);

    res.status(200).send(generateSuccessResponse(task));
  } catch (error) {
    res
      .status(404)
      .send(generateErrorResponse({ message: 'Something went wrong!', error }));
  }
});

//
// ─── POST TASKS ─────────────────────────────────────────────────────────────────
//

tasksRouter.post('/', uploadFile.single('image'), async (req, res) => {
  try {
    const task = req.body;
    console.log('req.files');
    console.log(req.files);
    await tasksService.create(task);
    res
      .status(201)
      .send(generateSuccessResponse({ message: 'Task add success!' }));
  } catch (error) {
    res
      .status(404)
      .send(generateErrorResponse({ message: 'Create plan failed!', error }));
  }
});

//
// ─── PUT TASKS ──────────────────────────────────────────────────────────────────
//

tasksRouter.put('/', uploadFile.single('image'), async (req, res) => {
  try {
    const task = req.body;

    await tasksService.update(task);

    res
      .status(200)
      .send(generateSuccessResponse({ message: 'Task update success!' }));
  } catch (error) {
    res
      .status(500)
      .send(generateErrorResponse({ message: 'Update plan failed!', error }));
  }
});

//
// ─── DELETE TASKS:ID ────────────────────────────────────────────────────────────
//

tasksRouter.delete('/', async (req, res) => {
  try {
    await tasksService.remove(req.body.id);

    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send(generateErrorResponse({ message: 'Delete plan failed!', error }));
  }
});

module.exports = { tasksRouter };
