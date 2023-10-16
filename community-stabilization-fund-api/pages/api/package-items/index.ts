import { PrismaClient } from '@prisma/client';

import type { PackageItemDTO } from '../../../src/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const PackageItemHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;
  switch (method) {
    case 'GET':
      getAllPackageItems(res, query);
      break;
    case 'POST':
      createPackageItem(body, res);
      break;
    case 'DELETE':
      deletePackageItems(body, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const createPackageItem = async (body: any, res: NextApiResponse) => {
  try {
    const result = await prisma.package_item.create({ data: body });
    return res
      .status(201)
      .send('Successfully created question with id: ' + result.id);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const getAllPackageItems = async (res: NextApiResponse, query: any) => {
  const pagination = query.pagination ? JSON.parse(query.pagination) : null;
  const { page, perPage } = pagination ?? { page: 1, perPage: 100 };

  try {
    const packageItems = (await prisma.package_item.findMany({
      // include: {
      //   // checklist_rules: true,
      //   package_group_items: true,
      // },
    })) as PackageItemDTO[];

    return res.json([...(packageItems ?? [])]);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

const deletePackageItems = async (ids: string[], res: NextApiResponse) => {
  try {
    await prisma.package_item.deleteMany({
      where: { id: { in: ids.map((id) => parseInt(id)) } },
    });

    return res.send('Successfully deleted package item(s) with ids: ' + ids);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export default PackageItemHandler;
