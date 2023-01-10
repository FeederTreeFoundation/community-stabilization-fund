import { executeQuery } from '../../../src';
import { queries } from '../../../src/db/constants';

import type { NextApiRequest, NextApiResponse } from 'next';
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
    id: number;
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
  const { method, body } = req;

  switch (method) {
    case 'GET':
      getAllFormResponses(res);
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

const getAllFormResponses = async (res: NextApiResponse) => {
  try {
    const responses = await executeQuery({
      sql: 'select * from form_responses',
    });
    return res.json([...responses]);
  } catch (error) {
    console.log(error);
    return res.json([]);
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
