import { Application } from "express";
import { signupUserController } from "../controllers/users/signupUser.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { getUserByIdController } from "../controllers/users/getUserById.controller";
import { updateUserByIdController } from "../controllers/users/updateUserById.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";

export async function createUserRouter(app: Application) {

    //signup
    app.post("/users/signup", signupUserController);
    //login
    app.post("/users/login", loginUserController); 
    // get all users
    app.get("/users", getAllUsersController);
    // get user by id
    app.get("/users/:id", getUserByIdController);
    // update user by id
    app.put("/users/:id", updateUserByIdController);
    // delete user by id
    app.delete("/users/:id", deleteUserController);
}