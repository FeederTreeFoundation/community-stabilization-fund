import { PrismaClient } from '@prisma/client';

import { executeQuery, queries } from '../../../src/db';

import type { FormResponse } from '../../../src/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const formResponseHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllFormResponses(res);
      break;
    case 'POST':
      createFormResponse(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        deleteFormResponse(ids, res);
      } else {
        deleteAllFormResponses(res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllFormResponses = async (res: NextApiResponse) => {

  try{
    const form_responses = await prisma.form_response.findMany({
      include: {
        feminine_health_care: true,
        address: true
      }
    }) as FormResponse[];

    return res.json([...(form_responses ?? [])]);

  } catch (error) {
    return res.json({error});
  }
};

const createFormResponse = async (body: string, res: NextApiResponse) => {
  const request = JSON.parse(body);
  const hygieneItems = request['hygiene_items'].join();

  const {feminine_members, needs_plan_b, hygiene_items, address_city, address_state, address_zip, address_country, address_line1, address_line2, ...rest} = request;

  const formResponse = {
    ...rest,
    feminine_health_care: {
      create: {
        feminine_members: feminine_members,
        hygiene_items: hygieneItems,
        needs_plan_b: needs_plan_b
      }
    },
    address: {
      create: {
        city: address_city,
        state: address_state,
        zipcode: address_zip,
        line1: address_line1,
        line2: address_line2
      }
    }
  };

  try {
    const result = await prisma.form_response.create({data: formResponse});

    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.id);
  } catch (error) {
    return res.json({ error });
  }

};

const deleteAllFormResponses = async (res: NextApiResponse) => {
  const sql = queries.truncateTableSql('form_response');
  try {
    await executeQuery({ sql });
    return res.status(201).send('Successfully reset table form_response');
  } catch (error) {
    return res.json({ error });
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
