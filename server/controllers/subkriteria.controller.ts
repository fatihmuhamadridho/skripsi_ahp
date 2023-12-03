import { ResponseController } from "./response.controller";
import { PrismaClient } from "@prisma/client";
import type { Subkriteria } from "@prisma/client";

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export interface SubkriteriaProps extends Omit<Subkriteria, "subkriteria_id"> {
  subkriteria_id?: number;
}

export class SubkriteriaController {
  static async getAll() {
    const response = await prisma.subkriteria.findMany();
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async getOne(subkriteria_id: number) {
    const response = await prisma.subkriteria.findUniqueOrThrow({
      where: { subkriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async postSubkriteria({
    name,
    kriteriaKriteria_id,
  }: SubkriteriaProps) {
    const response = await prisma.subkriteria.create({
      data: { name, kriteriaKriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_CREATE_DATA,
      data: response,
    };
  }
  static async putSubkriteria(
    { name, kriteriaKriteria_id }: SubkriteriaProps,
    subkriteria_id: number
  ) {
    const response = await prisma.subkriteria.update({
      data: { name, kriteriaKriteria_id },
      where: { subkriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_UPDATE_DATA,
      data: response,
    };
  }
  static async deleteSubkriteria(subkriteria_id: number) {
    const response = await prisma.subkriteria.delete({
      where: { subkriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_DELETE_DATA,
      data: response,
    };
  }
}
