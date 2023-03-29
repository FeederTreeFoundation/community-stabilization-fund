// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { executeQuery, queries } from '../../../src/db';

import type { NextApiRequest, NextApiResponse } from 'next';

const resetFormHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sql = queries.truncateTableSql('form_response');
  try {
    const result = await executeQuery({ sql });
    return res.status(201).send('Successfully reset table form_response');
  } catch (error) {
    return res.json({ error });
  }
};

export default resetFormHandler;
