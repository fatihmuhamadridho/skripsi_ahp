import { ResponseController } from "./response.controller";
import { PrismaClient } from "@prisma/client";
import type { Kriteria } from "@prisma/client";

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export interface KriteriaProps extends Omit<Kriteria, "kriteria_id"> {
  kriteria_id?: number;
}

export class KriteriaController {
  static async getAll() {
    const response = await prisma.kriteria.findMany();
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async getOne(kriteria_id: number) {
    const response = await prisma.kriteria.findUniqueOrThrow({
      where: { kriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async postKriteria({ name }: KriteriaProps) {
    const response = await prisma.kriteria.create({ data: { name } });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_CREATE_DATA,
      data: response,
    };
  }
  static async putKriteria({ name }: KriteriaProps, kriteria_id: number) {
    const response = await prisma.kriteria.update({
      data: { name },
      where: { kriteria_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_UPDATE_DATA,
      data: response,
    };
  }
  static async deleteKriteria(kriteria_id: number) {
    const response = await prisma.kriteria.delete({ where: { kriteria_id } });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_DELETE_DATA,
      data: response,
    };
  }
}
