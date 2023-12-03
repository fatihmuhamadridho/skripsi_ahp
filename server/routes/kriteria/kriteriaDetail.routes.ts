import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { KriteriaController } from "../../controllers/kriteria.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const kritera_id = Number(req.query.kritera_id);
  try {
    const response = await KriteriaController.getOne(kritera_id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const kritera_id = Number(req.query.kritera_id);
  const { name } = req.body;
  try {
    const response = await KriteriaController.putKriteria({ name }, kritera_id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const kritera_id = Number(req.query.kritera_id);
  try {
    const response = await KriteriaController.deleteKriteria(kritera_id);
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
