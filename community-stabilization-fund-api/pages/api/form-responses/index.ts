import { PrismaClient } from '@prisma/client';

import { executeQuery, queries } from '../../../src/db';

import type { FormResponse} from '../../../src/db';

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
      deleteAllFormResponses(res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

// const getAllFormResponses = async (res: NextApiResponse) => {
//   const sql =
//     `SELECT fr.*,
//       fh.id as fh_id,
//       fh.feminine_members,
//       fh.hygiene_items,
//       fh.needs_plan_b
//     FROM form_response AS fr
//     LEFT JOIN feminine_health_care AS fh
//     ON fr.feminine_health_care_id = fh.id`;
//
//   try {
//     const form_responses: FormResponse[] = await executeQuery({ sql });
//
//     return res.json([...(form_responses ?? [])]);
//   } catch (error) {
//     return res.json({ error });
//   }
// };

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
    return res.json({error});
  }

};

// const createFormResponse = async (body: string, res: NextApiResponse) => {
//   const formResponse = JSON.parse(body);
//   const hygiene_items = formResponse["hygiene_items"].join(',');
//
//   const fem_responses = {
//     "feminine_members": formResponse["feminine_members"],
//     "hygiene_items": hygiene_items,
//     "needs_plan_b": formResponse["needs_plan_b"]
//   };
//
//   const fem_sql = queries.makeCreateSql('feminine_health_care', fem_responses);
//
//   try{
//     const result = await executeQuery({sql: fem_sql});
//     const {feminine_members, hygiene_items, needs_plan_b, ...rest } = formResponse;
//     const packages_to_receive = rest["packages_to_receive"].join(',');
//
//     rest["packages_to_receive"] = packages_to_receive;
//     rest["feminine_health_care_id"] = result.insertId;
//
//     const sql = queries.makeCreateSql('form_response', rest);
//
//     try {
//       const result = await executeQuery({ sql });
//       console.log({ result });
//
//       return res
//         .status(201)
//         .send('Successfully created form response with id: ' + result.insertId);
//     } catch (error) {
//       return res.json({ error });
//     }
//
//   } catch (error) {
//     return res.json({error});
//   }
// };

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
