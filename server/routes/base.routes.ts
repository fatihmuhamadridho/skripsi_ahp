import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = { status: true, data: null };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {} = req.body;
  try {
    const response = { status: true, data: null };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const base_id = Number(req.query.base_id);
  try {
    const response = { status: true, data: null };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const base_id = Number(req.query.base_id);
  const {} = req.body;
  try {
    const response = { status: true, data: null };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const base_id = Number(req.query.base_id);
  try {
    const response = { status: true, data: null };
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
