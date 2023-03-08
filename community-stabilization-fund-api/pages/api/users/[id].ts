import { executeQuery, queries } from '../../../src/db';

import type { User } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const userId = query.id as string;

  switch (method) {
    case 'GET':
      getUserById(userId, res);
      break;
    case 'PUT':
      updateUserById(body, res);
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
  const sql = queries.makeGetByIdSql('api_user');
  const user: User = await executeQuery({ sql, values: [id] });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  }

  return res.json({ ...user });
};

const updateUserById = async (body: any, res: NextApiResponse) => {
  const sql = queries.makeUpdateSql('api_user', body, `id=${body.id}`);

  try {
    const result = await executeQuery({
      sql,
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (id: string, res: NextApiResponse) => {
  const sql = queries.makeDeleteSql('api_user');
  const results = await executeQuery({ sql, values: [id] });

  if (!results) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  }

  return res.send('Successfully deleted user with id: ' + id);
};

export default userHandler;
