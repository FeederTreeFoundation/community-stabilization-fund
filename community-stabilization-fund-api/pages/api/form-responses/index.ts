import { NextApiRequest, NextApiResponse } from "next";

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
  }
  itemRequests: string;
  additionalInformation: string;
  isPickUp: boolean;
  isVolunteering: boolean;
  isSubscribing: boolean;
  isJoining: boolean;
}

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

const getAllFormResponses = (res: NextApiResponse) => {
  return res.json([...responses]);
};

const createFormResponse = (body: FormResponse, res: NextApiResponse) => {
  return res.status(201).send('Successfully created form response with id: ' + body.id);
};

export default formResponseHandler;