import {PrismaClient} from '@prisma/client';

import type { AnswerDTO, FormResponseDTO } from '../../../src/db';
import type { NextApiRequest, NextApiResponse } from 'next';

import {executeQuery, queries} from '../../../src/db';

const prisma = new PrismaClient({
  datasources: {db: {url: process.env.DATABASE_URL}},
});

const formResponseHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const { disable_default_questions, ...rest } = body;

  switch (method) {
    case 'GET':
      getAllFormResponses(res);
      break;
    case 'POST':
      if(disable_default_questions) {
        createCustomFormResponse(rest, res);
      } else {
        createFormResponse(rest, res);
      }
      break;
    case 'PUT':
      if (body.ids) {
        const {ids, ...rest} = body;
        updateBulkFormResponses(ids, rest, res);
      } else {
        res.status(400).end('Missing ids in request body');
      }
      break;
    case 'DELETE':
      if (body.ids) {
        const {ids} = body;
        deleteFormResponse(ids, res);
      } else {
        deleteAllFormResponses(res);
        // deleteAllFormResponses(res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllFormResponses = async (res: NextApiResponse) => {
  try {
    const form_responses = (await prisma.form_response.findMany({
      include: {
        feminine_health_care: true,
        address: true,
        answers: true,
      },
      where: {
        archived: false,
      },
    })) as FormResponseDTO[];

    return res.json([...(form_responses ?? [])]);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createFormResponse = async (body: any, res: NextApiResponse) => {
  const { custom_question_responses, feminine_health_care, address, ...rest } = body;

  const customQuestionResponsesToCreate = JSON.parse(custom_question_responses);

  const formResponse = {
    ...rest,
    household_members: Number(rest.household_members),
    elderly_members: Number(rest.elderly_members),
    youth_members: Number(rest.youth_members),
    is_black: Boolean(rest.is_black === 'true'),
    live_in_southside_atlanta: Boolean(
      rest.live_in_southside_atlanta === 'true'
    ),
    live_in_pittsburgh_atlanta: Boolean(
      rest.live_in_pittsburgh_atlanta === 'true'
    ),
    is_local:
      Boolean(rest.live_in_southside_atlanta === 'true') ||
      Boolean(rest.live_in_pittsburgh_atlanta === 'true'),
    has_flu_symptoms: Boolean(rest.has_flu_symptoms === 'true'),
    is_pick_up: Boolean(rest.is_pick_up === 'true'),
    is_volunteering: Boolean(rest.is_volunteering === 'true'),
    is_subscribing: Boolean(rest.is_subscribing === 'true'),
    is_interested_in_membership: Boolean(
      rest.is_interested_in_membership === 'true'
    ),
    packages_to_receive: rest.packages_to_receive.join(),
    feminine_health_care: rest.packages_to_receive.includes(
      'Feminine Health Care'
    )
      ? {
        create: {
          feminine_members: Number(feminine_health_care?.feminine_members),
          hygiene_items: feminine_health_care?.hygiene_items?.join(),
          needs_plan_b: Boolean(
            feminine_health_care?.needs_plan_b === 'true'
          ),
        },
      }
      : undefined,
    address: {
      create: {
        country: address?.country,
        city: address?.city,
        state: address?.state,
        zipcode: address?.zipcode,
        line1: address?.line1,
        line2: address?.line2,
      },
    },
    answers: {
      createMany: {
        data: [
          ...customQuestionResponsesToCreate.map((item: AnswerDTO) => ({
            text: `${item.text}`,
            question_id: Number(item.question_id),
          }))
        ]
      },
    }
  };

  try {
    const result = await prisma.form_response.create({ data: formResponse });

    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const createCustomFormResponse = async (body: any, res: NextApiResponse) => {
  const { custom_question_responses, feminine_health_care, address, ...rest } = body;

  const customQuestionResponsesToCreate = JSON.parse(custom_question_responses);

  const formResponse = {
    ...rest,
    household_members: null,
    elderly_members: null,
    youth_members: null,
    is_black: null,
    live_in_southside_atlanta: null,
    live_in_pittsburgh_atlanta: null,
    is_local: null,
    has_flu_symptoms: null,
    is_pick_up: null,
    is_volunteering: null,
    is_subscribing: null,
    is_interested_in_membership: null,
    packages_to_receive: null,
    answers: {
      createMany: {
        data: [
          ...customQuestionResponsesToCreate.map((item: AnswerDTO) => ({
            text: `${item.text}`,
            question_id: Number(item.question_id),
          }))
        ]
      }
    }
  };

  try {
    const result = await prisma.form_response.create({data: formResponse});

    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    console.error({error});
    throw error;
  }
};

const updateBulkFormResponses = async (
  ids: string[],
  body: any,
  res: NextApiResponse
) => {
  const {feminine_health_care, address, ...rest} = body;

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

const deleteFormResponse = async (ids: string[], res: NextApiResponse) => {
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

const deleteAllFormResponses = async (res: NextApiResponse) => {
  const sql = queries.truncateTableSql('form_response');
  try {
    await executeQuery({sql});
    return res.status(201).send('Successfully reset table form_response');
  } catch (error) {
    console.error({error});
    throw error;
  }
};

export default formResponseHandler;

// TODO: Extract to its own file

// export function getExceptionStatus(exception: unknown) {
//   return exception instanceof ApiError
//     ? exception.statusCode
//     : HttpStatusCode.InternalServerError;
// }

// export function getExceptionMessage(exception: unknown) {
//   return isError(exception) ? exception.message : `Internal Server Error`;
// }

// export function getExceptionStack(exception: unknown) {
//   return isError(exception) ? exception.stack : undefined;
// }

// export function isError(exception: unknown): exception is Error {
//   return exception instanceof Error;
// }

// function errorHandler(exc: any, res: NextApiResponse, url?: string) {
//   const statusCode = getExceptionStatus(exc);
//   const message = getExceptionMessage(exc);
//   const stack = getExceptionStack(exc);

//   const timestamp = new Date().toISOString();

//   const responseBody = {
//     message,
//     statusCode,
//     timestamp,
//     path: url,
//   };

//   return res.status(statusCode).send(responseBody);

//   // // default to 500 server error
//   // console.error(err);
//   // return res.status(500).json({ message: err.message });
// }

// export async function withErrorHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   return async function (handler: NextApiHandler) {
//     try {
//       return handler(req, res);
//     } catch (e) {
//       return errorHandler(e, res, req.url);
//     }
//   };
// }

// export { errorHandler };
