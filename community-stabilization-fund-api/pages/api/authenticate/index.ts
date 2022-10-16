import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../src/db';

type Data = {
  token: string;
  expiresIn: number;
}

async function authHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { apiUser, token } = req.body
  const apiKey = `${apiUser}:${token}`

  // Verify api user and token exists
  const sql =  'SELECT * FROM api_token WHERE name';
  const users = await executeQuery({ sql });
  

  // Res
  res.status(200)
  // .setHeader("authorization", apiKey)
  .end()

  console.log({res})
};

export default authHandler;