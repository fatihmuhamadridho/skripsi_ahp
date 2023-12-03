import { ResponseController } from "./response.controller";
import { PrismaClient } from "@prisma/client";
import type { Karyawan } from "@prisma/client";

const prisma = new PrismaClient();

interface queryProps {
  username?: string;
  page?: number;
  limit?: number;
}

export interface KaryawanProps extends Omit<Karyawan, "karyawan_id"> {
  karyawan_id?: number;
}

export class KaryawanController {
  static async getAll() {
    prisma.karyawan.fields;
    const response = await prisma.karyawan.findMany({
      include: { Alternatif: true },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async getOne(karyawan_id: number) {
    const response = await prisma.karyawan.findUniqueOrThrow({
      where: { karyawan_id },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_GET_DATA,
      data: response,
    };
  }
  static async postKaryawan({
    fullname,
    gender,
    birth_place,
    birth_date,
    handphone,
    address,
    department,
  }: KaryawanProps) {
    const response = await prisma.karyawan.create({
      data: {
        fullname,
        gender,
        birth_place,
        birth_date,
        handphone,
        address,
        department,
      },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_CREATE_DATA,
      data: response,
    };
  }
  static async putKaryawan(
    karyawan_id: number,
    {
      fullname,
      gender,
      birth_place,
      birth_date,
      handphone,
      address,
      department,
    }: KaryawanProps
  ) {
    const response = await prisma.karyawan.update({
      where: { karyawan_id },
      data: {
        fullname,
        gender,
        birth_place,
        birth_date,
        handphone,
        address,
        department,
      },
    });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_UPDATE_DATA,
      data: response,
    };
  }
  static async deleteKaryawan(karyawan_id: number) {
    const response = await prisma.karyawan.delete({ where: { karyawan_id } });
    return {
      status: true,
      message: ResponseController.message.SUCCESS_DELETE_DATA,
      data: response,
    };
  }
}
