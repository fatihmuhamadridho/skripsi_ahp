import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { SubkriteriaController } from "../../controllers/subkriteria.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const subkriteria_id = Number(req.query.subkriteria_id);
  try {
    const response = await SubkriteriaController.getOne(subkriteria_id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const subkriteria_id = Number(req.query.subkriteria_id);
  const { name, kriteriaKriteria_id } = req.body;
  try {
    const response = await SubkriteriaController.putSubkriteria(
      { name, kriteriaKriteria_id },
      subkriteria_id
    );
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const subkriteria_id = Number(req.query.subkriteria_id);
  try {
    const response = await SubkriteriaController.deleteSubkriteria(
      subkriteria_id
    );
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
