import { ResponseController } from "./response.controller";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export interface UserProps
  extends Omit<User, "user_id" | "access_token" | "first_login"> {
  user_id?: number;
  access_token?: string;
  first_login?: boolean;
}

export class UserController {
  static async getAll() {
    const response = await prisma.user.findMany();
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async getOne(user_id: number) {
    const response = await prisma.user.findUniqueOrThrow({
      where: { user_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async postUser({
    fullname,
    username,
    password,
    access_token,
  }: UserProps) {
    const response = await prisma.user.create({
      data: { fullname, username, password, access_token, first_login: true },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_CREATE_DATA,
      data: response,
    };
  }
  static async putUser(
    user_id: number,
    { fullname, username, password, access_token, first_login }: UserProps
  ) {
    const response = await prisma.user.update({
      where: { user_id },
      data: { fullname, username, password, access_token, first_login },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_UPDATE_DATA,
      data: response,
    };
  }
  static async deleteUser(user_id: number) {
    const response = await prisma.user.delete({ where: { user_id } });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_DELETE_DATA,
      data: response,
    };
  }
}
