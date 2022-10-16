import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery, User } from "../../../src/db";

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const userId = query.id as string;

  switch (method) {
    case 'GET':
      getUserById(userId, res);
      break;
    case 'DELETE':
      deleteUserById(userId, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getUserById = async (id: string, res: NextApiResponse) => {
  const users: User[] = await executeQuery({sql: 'SELECT * FROM users WHERE id = ?', values: [id]});
  const user = users.find(user => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.json({...user});
};

const deleteUserById = async (id: string, res: NextApiResponse) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  const results = await executeQuery({sql, values: [id]});
  if (!results) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.send('Successfully deleted user with id: ' + id);
};

export default userHandler;