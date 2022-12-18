

import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery, queries } from "../../../../src/db";


const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
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

  const result = await executeQuery({ sql });
  const {error} = result;

  if(error) return res.status(400).send({error});
  if(result.length === 0) return res.status(401).send(`ERROR: There is no apikey matching ${apiUser}:${token}`);
  return res.status(200).end();
};


export default userHandler;