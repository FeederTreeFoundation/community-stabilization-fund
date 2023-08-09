# ADDING RESOURCES TO THE API

1. First, update the schema in `./prisma/schema.prisma` with the changes you want:

```prisma
model package_group {
  id         Int            @id @default(autoincrement())
  name      String
  items checklist_rule[]
}

model package_item {
  id    Int                 @id @default(autoincrement())
  name  String
  packages checklist_rule[]
}

model checklist_rule {
  quantity            String
  household_members   String
  bag_label_type      String
  delayed_until       DateTime?
  days_delayed_by     Int?
  weeks_delayed_by    Int?
  package_item        package_item     @relation(fields: [package_item_id], references: [id])
  package_item_id     Int // relation scalar field (used in the `@relation` attribute above)
  package_group       package_group @relation(fields: [package_group_id], references: [id])
  package_group_id    Int // relation scalar field (used in the `@relation` attribute above)
  submitted_on        DateTime    @default(dbgenerated("NOW()")) @db.DateTime

  @@id([package_item_id, package_group_id])
}
```

2. Update models of the database objects in `./src/db/models/`

```ts
export interface PackageGroup {
  id: number;
  name: string;
}

export interface PackageItem {
  id: number;
  name: string;
}

export interface ChecklistRule {
  quantity: string;
  household_members: string;
  bag_label_type: string;
  delayed_until: string;
  days_delayed_by: string;
  weeks_delayed_by: string;
  package_item: PackageItem;
  package_group: PackageGroup;
  submitted_on?: Date|null;
}
```

3. Add 'CRUD' resources to the api in `./pages/api/`

index.ts
```ts
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
```

[id].ts
```ts
import { PrismaClient } from '@prisma/client';

import type { ChecklistRule } from '../../../src/db';
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
    }) as ChecklistRule;

    return res.json(checklist_rule ?? {});
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateChecklistRuleById = async (body: any, res: NextApiResponse) => {
  const { feminine_health_care, address, id, ...rest } = body;

  try {
    const result = await prisma.form_response.update({
      where: { id: id },
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
}

export default checklistRuleHandler
```

4. Update services with the request(s) to the api in `./src/services/`

```ts
import getConfig from 'next/config';

import type { ChecklistRule } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/checklist-rules`;

const ChecklistRuleService = {
  getAllChecklistRules,
  createChecklistRule,
  updateChecklistRule,
  deleteAllChecklistRules,
  deleteChecklistRule,
};

async function getAllChecklistRules() {
  return await axiosInstance.get<ChecklistRule[]>(`${baseUrl}`);
}

async function createChecklistRule(data: any) {
  return await axiosInstance.post<ChecklistRule>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function updateChecklistRule(data: any) {
  return await axiosInstance.put<ChecklistRule>(`${baseUrl}/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function deleteChecklistRule(ids: number[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAllChecklistRules() {
  return await axiosInstance.delete<ChecklistRule>(`${baseUrl}`);
}

export default ChecklistRuleService;```