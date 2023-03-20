import { executeQuery, queries } from "../../../../src/db";

import type { NextApiRequest, NextApiResponse } from "next";

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      authenticateUser(body, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const authenticateUser = async (body: any, res: NextApiResponse) => {
  const { apiUser, token } = body; //foo:bar
  const sql = queries.makeAuthenticateSql(apiUser, token);

  try {
    const result = await executeQuery({ sql });
  
    if(result.length === 0) {
      return res.status(401).send(`ERROR: There is no apikey matching ${apiUser}:${token}`);
    }
  
    const id = result[0]?.id;
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(400).send({ error });
  }
};


export default authHandler;