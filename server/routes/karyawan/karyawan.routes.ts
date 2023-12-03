import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { KaryawanController } from "../../controllers/karyawan.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await KaryawanController.getAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    fullname,
    gender,
    birth_place,
    birth_date,
    handphone,
    address,
    department,
  } = req.body;
  try {
    const response = await KaryawanController.postKaryawan({
      fullname,
      gender,
      birth_place,
      birth_date,
      handphone,
      address,
      department,
    });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).json({ error: err.stack });
  },
});
