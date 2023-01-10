
import { executeQuery, queries } from "../../../src/db";

import type { User } from "../../../src/db";
import type { NextApiRequest, NextApiResponse } from "next";

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
  const sql = queries.makeGetByIdSql('users');
  const user: User = await executeQuery({sql, values: [id]});

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.json({...user});
};

const deleteUserById = async (id: string, res: NextApiResponse) => {
  const sql = queries.makeDeleteSql('users');
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