import { executeQuery, queries } from '../../../src/db';

import type { FormResponse} from '../../../src/db';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const responses: FormResponse[] = [];

type FeminineHealthCare = {
  isNeeded: boolean;
  householdMembers: number;
  items: string[];
};
const formResponseHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, url } = req;

  switch (method) {
    case 'GET':
      getAllFormResponses(res, url);
      break;
    case 'POST':
      createFormResponse(body, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllFormResponses = async (res: NextApiResponse, url?: string) => {
  const sql = queries.makeGetAllSql('form_response');

  try {
    const form_responses: FormResponse[] = await executeQuery({ sql });

    return res.json([...(form_responses ?? [])]);
  } catch (error) {
    return res.json({ error });
  }
};

const createFormResponse = async (body: string, res: NextApiResponse) => {
  const col_names = Object.keys(JSON.parse(body));
  const col_values = Object.values(JSON.parse(body));
  const quoted_values = col_values.map((value) =>{
    if(!value) return 'NULL';
    return typeof value === 'string' ? `"${value}"` : value
  });
  const sql = queries.makeCreateSql('form_response', col_names, quoted_values);
  
  try {
    const result = await executeQuery({ sql });
    console.log({ result });

    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.insertId);
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
