import { PrismaClient } from '@prisma/client';

import type { OrganizationDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const organizationHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const organization_id = query.id as string;
  
  switch (method) {
    case 'GET':
      getOrganizationById(organization_id, res);
      break;
    case 'PUT':
      updateOrganizationById(body, res);
      break;
    case 'DELETE':
      deleteOrganizationById(organization_id, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getOrganizationById = async (id: string, res: NextApiResponse) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: Number(id) },
      include: {
        api_keys: false,
        questions: true,
        checklist_rules: true
      },
    }) as OrganizationDTO;

    return res.json(organization ?? {});
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateOrganizationById = async (body: any, res: NextApiResponse) => {
  const { id, ...rest } = body;

  try {
    const result = await prisma.organization.update({
      where: { id: Number(id) },
      data: {
        ...rest,
      }
    });

    return res.json(result);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteOrganizationById = async (id: string, res: NextApiResponse) => {
  try {
    const result = await prisma.organization.delete({
      where: { id: Number(id) },
    });

    return res.json(result);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default organizationHandler;