import { Application } from "express";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { getUserByIdController } from "../controllers/users/getUserById.controller";
import { updateUserByIdController } from "../controllers/users/updateUserById.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { getMeUserController } from "../controllers/users/getMeUser.controller";
import { logoutUserController } from "../controllers/users/logoutUser.controller";
import { signUpUserController } from "../controllers/users/signupUser.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { generateAccessControlMiddleware } from "../middlewares/generateAccessControlMiddleware";

export async function createUserRouter(app: Application) {
  // sign up
  app.post("/users/sign-up", signUpUserController);

  // login
  app.post("/users/login", loginUserController);

  // get all users
  app.get("/users", checkAuth, generateAccessControlMiddleware(["SUPER_ADMIN"]), getAllUsersController);

  // update user by id
  app.put("/users/:userId",checkAuth, generateAccessControlMiddleware(["USER","SUPER_ADMIN","ADMIN"]), updateUserByIdController);

  // delete a user by id
  app.delete("/users/:userId",checkAuth,generateAccessControlMiddleware(["USER","ADMIN","SUPER_ADMIN"]), deleteUserController);

  app.get("/users/me",checkAuth, generateAccessControlMiddleware(["USER","ADMIN","SUPER_ADMIN"]),getMeUserController);
  // get user by id

  app.get("/users/:userId", checkAuth,generateAccessControlMiddleware(["SUPER_ADMIN","ADMIN","USER"]), getUserByIdController);

  app.post("/users/logout", checkAuth, logoutUserController);


  app.get("/user/refresh_token", ,refeshTokenController)
}