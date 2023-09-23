import { PrismaClient } from '@prisma/client';

import type { OrganizationDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import { executeQuery, queries } from '../../../src/db';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const organizationHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllOrganizations(res);
      break;
    case 'POST':
      createOrganization(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        deleteOrganizations(ids, res);
      } else {
        deleteAllOrganizations(res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllOrganizations = async (res: NextApiResponse) => {
  try {
    const organizations = (await prisma.organization.findMany({
      include: {
        api_users: false,
      },
    })) as OrganizationDTO[];

    return res.json([...(organizations ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createOrganization = async (body: any, res: NextApiResponse) => {
  const { api_users = [], ...rest } = body;

  const organization = {
    ...rest,
    api_users: {
      connect: api_users.map((user: {id: string}) => ({id: user.id})),
    },
  };
  
  try {
    const result = await prisma.organization.create({ data: organization });
  
    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteOrganizations = async (ids: string[], res: NextApiResponse) => {
  try {
    await prisma.organization.deleteMany({
      where: { id: { in: ids.map(id => parseInt(id)) } },
    });

    return res.send('Successfully deleted organization(s) with ids: ' + ids);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteAllOrganizations = async (res: NextApiResponse) => {
  const sql = queries.truncateTableSql('organization');
  try {
    await executeQuery({ sql });
    return res.status(201).send('Successfully reset table organization');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default organizationHandler;