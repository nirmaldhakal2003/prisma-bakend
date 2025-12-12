declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        role: "SUPER_ADMIN" | "ADMIN" | "USER";
      };
    }
  }
}

import express from "express";
import { createTodoRouter } from "./routers/todo.router";
import { createCategoryRouter } from "./routers/category.router";
import { createUserRouter } from "./routers/user.router";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get(
  "/",
  (req, res, next) => {
    console.log("1 received request on /");
    const user = req.query.user;
    if (user === "ram") {
      req.user = {
        id: 1,
        username: "ram",
        email: "nirmal@gmail.com",
        role: "SUPER_ADMIN",
      };

      next();
    } else {
      res.status(401).json({
        message: "You are not authorized!",
      });
    }
  },
  (req, res) => {
    const userDetails = req.user;
    console.log("allowed user is: ", userDetails);

    res.json({
      message: "hello ram!",
    });
  }
);

createTodoRouter(app);
createCategoryRouter(app);
createUserRouter(app);

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
