import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "../../controllers/user.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user_id = Number(req.query.user_id);
  try {
    const response = await UserController.getOne(user_id);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const user_id = Number(req.query.user_id);
  const { fullname, username, password } = req.body;
  try {
    const response = await UserController.putUser(user_id, {
      fullname,
      username,
      password,
    });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const user_id = Number(req.query.user_id);
  try {
    const response = await UserController.deleteUser(user_id);
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
