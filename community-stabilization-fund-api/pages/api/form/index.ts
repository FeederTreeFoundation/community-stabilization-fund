import { PrismaClient } from '@prisma/client';

import type { FormDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import {executeQuery, queries} from '../../../src/db';

const prisma = new PrismaClient({
  datasources: {db: {url: process.env.DATABASE_URL}},
});

const formHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllForms(res);
      break;
    case 'POST':
      createForm(body, res);
      break;
    case 'PUT':
      if (body.ids) {
        const {ids, ...rest} = body;
        updateBulkForms(ids, rest, res);
      } else {
        res.status(400).end('Missing ids in request body');
      }
      break;
    case 'DELETE':
      if (body.ids) {
        const {ids} = body;
        deleteForm(ids, res);
      } else {
        res.status(400).end('Missing ids in request body');
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllForms = async (res: NextApiResponse) => {
  try {
    const forms = (await prisma.form.findMany({
      include: {
        form_questions: true,
        form_responses: true,
      },
    })) as FormDTO[];

    return res.json([...(forms ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createForm = async (body: any, res: NextApiResponse) => {
  const { ...rest } = body;
  
  const form = {
    name: `${rest.name}`,
    organization_id: Number(rest.organization_id),
    submitted_by: `${rest.submitted_by}`,
    last_updated_by: `${rest.submitted_by}`,
  };

  try {
    const result = await prisma.form.create({ data: form });

    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateBulkForms = async (
  ids: string[],
  body: any,
  res: NextApiResponse
) => {
  const {menstrual_health_care, address, ...rest} = body;

  try {
    const result = await prisma.form_response.updateMany({
      where: {id: {in: ids.map((id) => parseInt(id))}},
      data: {
        ...rest,
      },
    });

    return res.json(result);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteForm = async (ids: string[], res: NextApiResponse) => {
  const sql = queries.makeBulkDeleteSql('form_response', ids);
  try {
    const results = await executeQuery({sql});
    if (!results) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    }
    return res.send('Successfully deleted form response with id: ' + ids);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default formHandler;
