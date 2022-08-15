import { NextApiRequest, NextApiResponse } from "next";

type User = {
    id?: string;
    name?: string;
    apiToken?: string;
    isDeleted?: boolean;
}

const users: User[] = [];

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllUsers(res)
      break;
    case 'POST':
      createUser(body as User, res)
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

const getAllUsers = (res: NextApiResponse) => {
  return res.json([...users]);
}

const createUser = (body: User, res: NextApiResponse) => {
  return res.status(200).json({...body})
};

export default userHandler;