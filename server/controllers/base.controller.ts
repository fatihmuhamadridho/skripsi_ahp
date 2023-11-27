import { ResponseController } from "./response.controller";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export class BaseController {
  static async getAll() {
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
    };
  }
  static async getOne() {
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
    };
  }
  static async postBase() {
    return {
      status: true,
      message: ResponseController.message.SUCCESS_CREATE_DATA,
    };
  }
  static async putBase() {
    return {
      status: true,
      message: ResponseController.message.SUCCESS_UPDATE_DATA,
    };
  }
  static async deleteBase() {
    return {
      status: true,
      message: ResponseController.message.SUCCESS_DELETE_DATA,
    };
  }
}
