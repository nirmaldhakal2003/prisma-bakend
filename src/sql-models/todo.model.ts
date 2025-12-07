import { RowDataPacket } from "mysql2";
import { appDbConnection } from "../lib/mysql";

export type StatusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Todo extends RowDataPacket {
  id: number;
  title: string;
  status: StatusType;
  description: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export async function createTodo(todoData: Todo) {
  // todos.push(todoData);
  const db = await appDbConnection();

  const result = await db.query(
    `INSERT INTO tasks (title, status, description, completed_at, created_at, updated_at, user_id) VALUES ("${todoData.title}", "${todoData.status}", "${todoData.description}", "${todoData.completed_at}", "${todoData.created_at}", "${todoData.updated_at}", ${todoData.user_id});`
  );

  console.log("created todo result", result);

  return todoData;
}

export async function updateTodo(todoId: number, body: Partial<Todo>) {
  const todo = await getTodoById(todoId);
  if (!todo.data) {
    throw new Error(`Todo not found by id - ${todoId}`);
  }

  // update todo code
  const db = await appDbConnection();

  const result = await db.query(`
    UPDATE tasks 
    set 
    title="${body.title}",
    ${
      body.description?.length && body.description?.length > 0
        ? `description="${body.description}",`
        : ""
    }
    status="${body.status}",
    completed_at="${body.completed_at}"
    WHERE id=${todoId};
  `);

  console.log("Updated result", result);

  return body;
}

// export function deleteTodo(todoId: number) {
//   const todo = getTodoById(todoId);
//   if (!todo.data) {
//     throw new Error(`Todo not found by id - ${todoId}`);
//   }

//   const splicedTodos = todos.splice(todo.idx, 1);

//   return splicedTodos;
// }

export async function getTodoById(todoId: number) {
  const db = await appDbConnection();

  const result = await db.query(`
    SELECT * FROM tasks
    WHERE id=${todoId};
  `); // [a, sth]

  const todo = result[0] as Todo[];
  console.log("get todo", todo);

  if (todo.length === 0) {
    throw new Error(`Todo not found by id - ${todoId}`);
  }

  return {
    data: todo,
  };
}

// export function getAllTodos(query: { status?: StatusType }) {
//   if (!query.status) {
//     return todos;
//   }

//   const filteredTodos = todos.filter((todo) => {
//     if (todo.status === query.status) return true;
//     else return false;
//   });

//   return filteredTodos;
// }
