import { createConnection } from "mysql2/promise";

export async function appDbConnection() {
  const mysqlDb = await createConnection({
    user: "root",
    password: "password",
    port: 3307,
    host: "localhost",
    database: "todo_app",
  });

  return mysqlDb;
}

async function getAllDatabases() {
  const db = await appDbConnection();
  const result = await db.query(`USE todo_app;`);
  console.log("result", result);
}

// getAllDatabases();
