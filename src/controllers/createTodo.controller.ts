import { Request, Response } from "express";
import { createTodo } from "../prisma-models/todo.model";
// import { createTodo } from "../sql-models/todo.model";
// import { createTodo } from "../models/todo.model";

export const createTodoController = async (req: Request, res: Response) => {
  const body = req.body;

  // TODO: validate the body

  const createdTodo = await createTodo(body);

  // if(createdTodo.status === 'COMPLETED') {
  //   sendEmailNotificationToUser();
  // }

  res.json({
    message: "create todo",
    data: createdTodo,
  });
};