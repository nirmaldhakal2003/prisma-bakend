import { TLoginUserSchema } from "../controllers/users/loginUser.controller";
import { TSignUpUserSchema } from "../controllers/users/signupUser.controller";
import { TUpdateUserSchema } from "../controllers/users/updateUserById.controller";
import { prisma } from "../lib/prisma";

export async function createUser(data: TSignUpUserSchema) {
  // check if user already exists by that email 
  const userFound = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          username: data.username,
        },
      ],
    },
  });
  if (userFound) {
    throw new Error(`User already exists`);
  }

  const createdUser = await prisma.users.create({
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
    },
  });
  return createdUser;
}

export async function loginUser(data: TLoginUserSchema) {
  const userFound = await prisma.users.findFirst({
    where: {
      username: data.username,
    },
  });

  if (!userFound) {
    throw new Error(`You are not registered! Please register.`);
  }

  if (data.password !== userFound.password) {
    throw new Error(`Username or password invalid`);
  }
  // missing

  return userFound;
}

export async function getAllUsers() {
  const users = await prisma.users.findMany();
  return users;
}

export async function getUserById(id: number) {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error(`User with id - ${id} not found`);
  }

  return user;
}

export async function updateUserById(id: number, data: TUpdateUserSchema) {
  const userFound = await getUserById(id);

  // check weather if email has changed
  if (userFound.email !== data.email) {
    // email is changed
    const emailsFound = await prisma.users.findMany({
      where: {
        email: data.email || "",
      },
    });
    if (emailsFound) {
      throw new Error(`Email already exist! Use different email.`);
    }
  }

  const updatedUser = await prisma.users.update({
    where: {
      id: userFound.id,
    },
    data: {
      email: data.email || userFound.email,
      username: data.username || userFound.username,
      password: data.password || userFound.password,
    },
  });
  return updatedUser;
}

export async function deleteUser(id: number) {
  const userFound = await getUserById(id);

  const deletedUser = await prisma.users.delete({
    where: {
      id: userFound.id,
    },
  });
  return deletedUser;
}