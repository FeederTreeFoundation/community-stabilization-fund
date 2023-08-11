
import { PrismaClient } from '@prisma/client';

import type { UserDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import { executeQuery, queries } from '../../../src/db';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

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
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getUserById = async (id: string, res: NextApiResponse) => {
  try {
    const user: UserDTO | null = await prisma.api_user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    }

    return res.json({ ...user });
  }
  catch (error) { 
    console.error({error});
    throw error;
  }
};

const updateUserById = async (body: any, res: NextApiResponse) => {
  const sql = queries.makeUpdateSql('api_user', body, `id=${body.id}`);

  try {
    const result = await executeQuery({sql});
    if(!result) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    }
  
    return res.json(result);
  } catch (error) {
    return res.json({error});
  }
};

const deleteUserById = async (id: string, res: NextApiResponse) => {
  const sql = queries.makeDeleteSql('api_user');

  try {
    const results = await executeQuery({ sql, values: [id] });
    if (!results) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    }
  
    return res.send('Successfully deleted user with id: ' + id);
  } catch (error) {
    return res.json({error});
  }
};

export default userHandler;
