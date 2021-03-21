//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

import express, { ErrorRequestHandler, Request, Response } from 'express';
import * as tasksService from './tasks.service';
import { Task } from './task.interface';
import { Tasks } from './tasks.interface';
import { uploadFile } from '../common/uploadFile.middleware';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/generateResponse';

//
// ─── ROUTER DEFINITION ──────────────────────────────────────────────────────────
//

export const tasksRouter = express.Router();

//
// ─── CONTROLLER DEFINITIONS ─────────────────────────────────────────────────────
//

//
// ─── GET TASKS ──────────────────────────────────────────────────────────────────
//

tasksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId: string = req.body.userId;
    const tasks: Tasks = await tasksService.findAll();

    // const userTasks: Tasks = {};
    // Object.keys(tasks).forEach((taskIndex: string) => {
    //   // if (tasks[taskIndex].addedBy === userId) {
    //   // userTasks[userId] = tasks[userId];
    //   // }
    // });
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

tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const task: Task = await tasksService.find(id);

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

tasksRouter.post(
  '/',
  uploadFile.single('image'),
  async (req: Request, res: Response) => {
    try {
      const task: Task = req.body;
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
  }
);

//
// ─── PUT TASKS ──────────────────────────────────────────────────────────────────
//

tasksRouter.put(
  '/',
  uploadFile.single('image'),
  async (req: Request, res: Response) => {
    try {
      const task: Task = req.body;

      await tasksService.update(task);

      res
        .status(200)
        .send(generateSuccessResponse({ message: 'Task update success!' }));
    } catch (error) {
      res
        .status(500)
        .send(generateErrorResponse({ message: 'Update plan failed!', error }));
    }
  }
);

//
// ─── DELETE TASKS:ID ────────────────────────────────────────────────────────────
//

tasksRouter.delete('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    await tasksService.remove(req.body.id);

    res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send(generateErrorResponse({ message: 'Delete plan failed!', error }));
  }
});
