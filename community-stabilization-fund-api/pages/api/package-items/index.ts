import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const PackageItemHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      createPackageItem(body, res);
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

export default PackageItemHandler;
