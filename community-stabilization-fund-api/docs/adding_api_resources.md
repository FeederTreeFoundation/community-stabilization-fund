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
export interface PackageGroupDTO {
  id: number;
  name: string;
}

export interface PackageItemDTO {
  id: number;
  name: string;
}

export interface ChecklistRuleDTO {
  id?: number;
  quantity: string;
  household_members: string;
  bag_label_type: string;
  delayed_until?: Date | null;
  days_delayed_by?: number | null;
  weeks_delayed_by?: number | null;
  package_item: PackageItemDTO;
  package_group: PackageGroupDTO;
  submitted_on?: Date|null;
}
```

3. Add 'CRUD' resources to the api in `./pages/api/`

../index.ts
```ts
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
    await executeQuery({ sql });
    return res.status(201).send('Successfully reset table checklist_rule');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default checklistRuleHandler;
```

../[id].ts
```ts
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
```

4. Update services with the request(s) to the api in `./src/services/`

```ts
import getConfig from 'next/config';

import type { ChecklistRuleDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/checklist-rules`;

const ChecklistRuleService = {
  getAll,
  create,
  update,
  deleteAll,
  delete: _delete,
};

async function getAll() {
  return await axiosInstance.get<ChecklistRuleDTO[]>(`${baseUrl}`);
}

async function create(data: any) {
  return await axiosInstance.post<ChecklistRuleDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function update(data: any) {
  return await axiosInstance.put<ChecklistRuleDTO>(`${baseUrl}/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function _delete(ids: number[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAll() {
  return await axiosInstance.delete<ChecklistRuleDTO>(`${baseUrl}`);
}

export default ChecklistRuleService;
```