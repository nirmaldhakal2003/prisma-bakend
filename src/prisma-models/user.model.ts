import { TLoginUserSchema } from "../controllers/users/loginUser.controller";
import { TSignUpUserSchema } from "../controllers/users/signupUser.controller";
import { prisma } from "../lib/prisma";

export async function createUser(data: TSignUpUserSchema) {

    const userFound = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    email: data.email
                },
                {
                    username: data.username
                }
            ],
        }
    })

    const CreateUser = await prisma.users.create({
        data: {
            email: data.email,
            username: data.username,
            password: data.password,
        },
    });
    return CreateUser;
} 

export async function loginUser(data:TLoginUserSchema)
{
    const userFound = await prisma.users.findFirst({
        where:{
            username:data.username
        }
    });
    if(!userFound){
        throw new Error("User not found please register");
    }
    if(data.password !== userFound.password){
        throw new Error("username or password is invalid");
    }
    return userFound;
}