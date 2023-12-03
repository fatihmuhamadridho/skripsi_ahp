import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { SubkriteriaController } from "../../controllers/subkriteria.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await SubkriteriaController.getAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, kriteriaKriteria_id } = req.body;
  try {
    const response = await SubkriteriaController.postSubkriteria({
      name,
      kriteriaKriteria_id,
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
