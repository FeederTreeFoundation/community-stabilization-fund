import { PrismaClient } from '@prisma/client';

import type { ChecklistRuleDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import { executeQuery, queries } from '../../../src/db';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const checklistRuleHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllChecklistRules(res);
      break;
    case 'POST':
      createChecklistRule(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        deleteChecklistRules(ids, res);
      } else {
        deleteAllChecklistRules(res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllChecklistRules = async (res: NextApiResponse) => {
  try {
    const checklist_rules = (await prisma.checklist_rule.findMany({
      include: {
        package_group: true,
        package_item: true,
      },
    })) as ChecklistRuleDTO[];

    return res.json([...(checklist_rules ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createChecklistRule = async (body: any, res: NextApiResponse) => {
  const { package_group, package_item, ...rest } = body;

  const packageGroup = await prisma.package_group.findFirst({
    where: { name: { contains: package_group.name }},
  });
  
  const packageItem = await prisma.package_item.findFirst({
    where: { name: { contains: package_item.name }},
  });

  const checklistRule = {
    ...rest,
    quantity: rest.quantity,
    days_delayed_by: rest.days_delayed_by ? Number(rest.days_delayed_by) : null,
    weeks_delayed_by: rest.weeks_delayed_by ? Number(rest.weeks_delayed_by) : null,
    delayed_until: rest.delayed_until ? new Date(rest.delayed_until) : null,
    package_group: {
      connectOrCreate: {
        where: { id: packageGroup?.id ?? 0 },
        create: { name: package_group.name },
      }
    },
    package_item: {
      connectOrCreate: {
        where: { id: packageItem?.id ?? 0 },
        create: { name: package_item.name },
      }
    },
  };
  
  try {
    const result = await prisma.checklist_rule.create({ data: checklistRule });
  
    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteChecklistRules = async (ids: string[], res: NextApiResponse) => {
  try {
    await prisma.checklist_rule.deleteMany({
      where: { id: { in: ids.map(id => parseInt(id)) } },
    });

    return res.send('Successfully deleted form response(s) with ids: ' + ids);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteAllChecklistRules = async (res: NextApiResponse) => {
  const sql = queries.truncateTableSql('checklist_rule');
  try {
    return res.status(201).send('Successfully reset table checklist_rule');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default checklistRuleHandler;
