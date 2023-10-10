import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const PackageGroupItemHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      createPackageGroupItem(body, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const createPackageGroupItem = async (body: any, res: NextApiResponse) => {
  const { ...rest } = body;
  const packageGroupItem = {
    package_group_id: {
      connect: {
        id: Number(rest.package_group_id),
      },
    },
    package_item_id: {
      connect: {
        id: Number(rest.package_item_id),
      },
    },
  };
  try {
    const result = await prisma.package_group_items.create({
      data: packageGroupItem,
    });
    return res
      .status(201)
      .send('Successfully created package group item with id: ' + result.id);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export default PackageGroupItemHandler;
