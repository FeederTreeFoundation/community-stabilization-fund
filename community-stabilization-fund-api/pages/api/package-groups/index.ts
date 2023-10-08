import { PrismaClient } from '@prisma/client';

import type { PackageGroupDTO } from '../../../src/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const PackageGroupHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;
  switch (method) {
    case 'GET':
      getAllPackageGroups(res, query);
      break;
    case 'POST':
      createPackageGroup(body, res);
      break;
    case 'DELETE':
      deletePackageGroups(body, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const createPackageGroup = async (body: any, res: NextApiResponse) => {
  try {
    const result = await prisma.package_group.create({ data: body });
    return res
      .status(201)
      .send('Successfully created question with id: ' + result.id);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const getAllPackageGroups = async (res: NextApiResponse, query: any) => {
  const pagination = query.pagination ? JSON.parse(query.pagination) : null;
  const { page, perPage } = pagination ?? { page: 1, perPage: 100 };

  try {
    const packageGroups = (await prisma.package_group.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    })) as PackageGroupDTO[];

    return res.json([...(packageGroups ?? [])]);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const deletePackageGroups = async (ids: string[], res: NextApiResponse) => {
  try {
    await prisma.package_group.deleteMany({
      where: { id: { in: ids.map((id) => parseInt(id)) } },
    });

    return res.send('Successfully deleted package group(s) with ids: ' + ids);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export default PackageGroupHandler;
