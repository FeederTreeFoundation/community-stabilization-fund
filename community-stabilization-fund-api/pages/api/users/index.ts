import { PrismaClient } from '@prisma/client';

import type { UserDTO } from "../../../src/db";
import type { NextApiRequest, NextApiResponse } from "next";

import { executeQuery } from "../../../src/db";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllUsers(res);
      break;
    case 'POST':
      createUser(body as UserDTO, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        bulkDeleteUsers(ids, res);
      } else {
        res.status(400).end('Missing ids in request body');
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllUsers = async (res: NextApiResponse) => {
  const sql =  'SELECT * FROM users';

  try {
    const users: UserDTO[] = await executeQuery({ sql });
    return res.json([...users]);
  } catch (error) {
    return res.json({error});
  }
};

const createUser = async (body: UserDTO, res: NextApiResponse) => {
  const sql = 'INSERT INTO users (name) VALUES (?);';

  try {
    const results = await executeQuery({ sql, values: [body.name || ''] });
    return results && res.status(201).setHeader('Location', `/users/${body.id}`);
  } catch (error) {
    return res.json({error});
  }
};

const bulkDeleteUsers = async (ids: string[], res: NextApiResponse) => {
  try {
    const results = await prisma.api_user.deleteMany({
      where: {
        id: { in: ids.map(id => parseInt(id)) }
      }
    });

    return res.json({ results });
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default userHandler;