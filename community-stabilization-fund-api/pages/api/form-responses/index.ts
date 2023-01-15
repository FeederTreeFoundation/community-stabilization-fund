import { HttpStatusCode } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

import { executeQuery, queries } from '../../../src/db';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const responses: FormResponse[] = [];

type FormResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_type: string;
  address_id: number;
  is_black: boolean;
  is_local: boolean;
  household_members: number;
  has_flu_symptoms?: boolean;
  packages: string[];
  feminine_health_care_id: number;
  item_requests: string;
  additional_information: string;
  is_pick_up: boolean;
  is_volunteering: boolean;
  is_subscribing: boolean;
  is_joining: boolean;
};

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
      createFormResponse(body as FormResponse, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllFormResponses = async (res: NextApiResponse, url?: string) => {
  const sql = queries.makeGetAllSql('form_responses');

  try {
    const form_responses: FormResponse[] = await executeQuery({ sql });

    return res.json([...(form_responses ?? [])]);
  } catch (error) {
    errorHandler(error, res, url);
  }
};

const createFormResponse = async (body: FormResponse, res: NextApiResponse) => {
  const col_names = Object.keys(body);
  const col_values = Object.values(body);
  const quoted_values = col_values.map((value) =>
    typeof value === 'string' ? `"${value}"` : value
  );
  const sql = queries.makeCreateSql('form_responses', col_names, quoted_values);
  try {
    const result = await executeQuery({
      sql,
    });
    return res
      .status(201)
      .send('Successfully created form response with id: ' + result.insertId);
  } catch (error) {
    console.log(error);
  }
};

export default formResponseHandler;

// TODO: Extract to its own file

export function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiError
    ? exception.statusCode
    : HttpStatusCode.InternalServerError;
}

export function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`;
}

export function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined;
}

export function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

function errorHandler(exc: any, res: NextApiResponse, url?: string) {
  const statusCode = getExceptionStatus(exc);
  const message = getExceptionMessage(exc);
  const stack = getExceptionStack(exc);

  const timestamp = new Date().toISOString();

  const responseBody = {
    message,
    statusCode,
    timestamp,
    path: url,
  };

  return res.status(statusCode).send(responseBody);

  // // default to 500 server error
  // console.error(err);
  // return res.status(500).json({ message: err.message });
}

export async function withErrorHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return async function (handler: NextApiHandler) {
    try {
      return handler(req, res);
    } catch (e) {
      return errorHandler(e, res, req.url);
    }
  };
}

export { errorHandler };
