import { PrismaClient } from '@prisma/client';

import type { QuestionDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import { executeQuery, queries } from '../../../src/db';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const QuestionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      getAllQuestions(res, query);
      break;
    case 'POST':
      createQuestion(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        deleteQuestions(ids, res);
      } else {
        deleteAllQuestions(res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllQuestions = async (res: NextApiResponse, query: any) => {
  const pagination = query.pagination ? JSON.parse(query.pagination) : null;
  const { page, perPage } = pagination ?? { page: 1, perPage: 100 };

  try {
    const questions = (await prisma.question.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        answers: true,
      },
    })) as QuestionDTO[];

    return res.json([...(questions ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createQuestion = async (body: any, res: NextApiResponse) => {
  const { ...rest } = body;
  
  const question = {
    text: `${rest.text}`,
    type: `${rest.type}`,
    hidden: Boolean(rest.hidden),
    required: Boolean(rest.required),
    role: rest.role ? `${rest.role}` : null,
    options: rest.options ? `${rest.options}` : null,
    helper_text: rest.helper_text ? `${rest.helper_text}` : null,
    organization: {
      connect: {
        id: Number(rest.organization_id),
      }
    },
  };
  
  try {
    const result = await prisma.question.create({ data: question });
  
    return res
      .status(201)
      .send('Successfully created question with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteQuestions = async (ids: string[], res: NextApiResponse) => {
  try {
    await prisma.question.deleteMany({
      where: { id: { in: ids.map(id => parseInt(id)) } },
    });

    return res.send('Successfully deleted question(s) with ids: ' + ids);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const deleteAllQuestions = async (res: NextApiResponse) => {
  const sql = queries.truncateTableSql('question');
  try {
    await executeQuery({ sql });
    return res.status(201).send('Successfully reset table question');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default QuestionHandler;