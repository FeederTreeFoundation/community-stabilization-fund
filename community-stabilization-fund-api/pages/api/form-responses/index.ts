import { HttpStatusCode } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

import { executeQuery, queries } from '../../../src/db';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const responses: FormResponse[] = [];

type FormResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneType: string;
  address: string;
  isBlack: boolean;
  isLocal: boolean;
  householdMembers: number;
  hasFluSymptoms?: boolean;
  packages: string[];
  feminineHealthCare: {
    isNeeded: boolean;
    householdMembers: number;
    items: string[];
  };
  itemRequests: string;
  additionalInformation: string;
  isPickUp: boolean;
  isVolunteering: boolean;
  isSubscribing: boolean;
  isJoining: boolean;
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
    console.log({ form_responses });

    return res.json(form_responses ? [...form_responses] : []);
  } catch (error) {
    errorHandler(error, res, url);
  }
};

const createFormResponse = async (body: FormResponse, res: NextApiResponse) => {
  try {
    const response = await executeQuery({
      sql: queries.makeFormResponse(body),
    });
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
  // return res
  //   .status(201)
  //   .send('Successfully created form response with id: ' + body.id);
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
