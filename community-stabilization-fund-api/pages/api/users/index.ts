import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../src/modules/users";
import { executeQuery } from "../../../src/db";

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllUsers(res);
      break;
    case 'POST':
      createUser(body as User, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllUsers = async (res: NextApiResponse) => {
  const sql =  'SELECT * FROM users';
  const users = await executeQuery({ sql });
  return res.json([...users]);
};

const createUser = async (body: User, res: NextApiResponse) => {
  const sql = 'INSERT INTO users (name) VALUES (?);';
  const results = await executeQuery({ sql, values: [body.name || ''] });
  return results && res.status(201).setHeader('Location', `/users/${body.id}`);
};

export default userHandler;