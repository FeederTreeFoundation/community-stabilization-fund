import { PrismaClient } from '@prisma/client';

import type { ChecklistRule } from '../../../src/db';
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
    })) as ChecklistRule[];

    return res.json([...(checklist_rules ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createChecklistRule = async (body: any, res: NextApiResponse) => {
  const { package_group, package_item, ...rest } = body;

  const checklistRule = {
    ...rest,
    quantity: Number(rest.quantity),
    delayed: Boolean(rest.delayed),
    days_delayed_by: Number(rest.days_delayed_by),
    weeks_delayed_by: Number(rest.weeks_delayed_by),
    delayed_until: new Date(rest.delayed_until),
    package_group: {
      connectOrCreate: {
        where: { name: package_group.name },
        create: { name: package_group.name },
      }
    },
    package_item: {
      connectOrCreate: {
        where: { name: package_item.name },
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
    const result = await prisma.checklist_rule.deleteMany({
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
    await executeQuery({ sql });
    return res.status(201).send('Successfully reset table checklist_rule');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default checklistRuleHandler;
