import { PrismaClient } from '@prisma/client';

import type { QuestionDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const QuestionHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const question_id = query.id as string;
  
  switch (method) {
    case 'GET':
      getQuestionById(question_id, res);
      break;
    case 'PUT':
      updateQuestionById(body, res);
      break;
    case 'DELETE':
      deleteQuestionById(question_id, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getQuestionById = async (id: string, res: NextApiResponse) => {
  try {
    const question = await prisma.question.findUnique({
      where: { id: Number(id) },
      include: {
        answers: true,
      },
    }) as QuestionDTO;

    return res.json(question ?? {});
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateQuestionById = async (body: any, res: NextApiResponse) => {
  const { id, ...rest } = body;

  try {
    const result = await prisma.question.update({
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

const deleteQuestionById = async (id: string, res: NextApiResponse) => {
  try {
    const result = await prisma.question.delete({
      where: { id: Number(id) },
    });

    return res.json(result);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default QuestionHandler;