import { PrismaClient } from '@prisma/client';

import type { ChecklistRuleDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const checklistRuleHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const checklist_rule_id = query.id as string;
  
  switch (method) {
    case 'GET':
      getChecklistRuleById(checklist_rule_id, res);
      break;
    case 'PUT':
      updateChecklistRuleById(body, res);
      break;
    case 'DELETE':
      deleteChecklistRuleById(checklist_rule_id, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getChecklistRuleById = async (id: string, res: NextApiResponse) => {
  try {
    const checklist_rule = await prisma.checklist_rule.findUnique({
      where: { id: parseInt(id) },
      include: {
        package_group: true,
        package_item: true,
      },
    }) as ChecklistRuleDTO;

    return res.json(checklist_rule ?? {});
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateChecklistRuleById = async (body: any, res: NextApiResponse) => {
  const { id, ...rest } = body;

  try {
    const result = await prisma.checklist_rule.update({
      where: { id: parseInt(id) },
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

const deleteChecklistRuleById = async (id: string, res: NextApiResponse) => {
  try {
    const result = await prisma.checklist_rule.delete({
      where: { id: parseInt(id) },
    });

    return res.json(result);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default checklistRuleHandler;