import { Application } from "express";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { getUserByIdController } from "../controllers/users/getUserById.controller";
import { updateUserByIdController } from "../controllers/users/updateUserById.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { signUpUserController } from "../controllers/users/signupUser.controller";

export async function createUserRouter(app: Application) {
  // sign up
  app.post("/users/sign-up", signUpUserController);
  // login
  app.post("/users/login", loginUserController);
  // get all users
  app.get("/users", getAllUsersController);
  // get user by id
  app.get("/users/:userId", getUserByIdController);
  // update user by id
  app.put("/users/:userId", updateUserByIdController);
  // delete a user by id
  app.delete("/users/:userId", deleteUserController);
}