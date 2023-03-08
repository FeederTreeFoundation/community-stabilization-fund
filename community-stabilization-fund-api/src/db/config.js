import serverless from 'serverless-mysql';

// Require and initialize with default options
const local = {
  host: process.env.CSF_ENDPOINT || 'localhost',
  database: process.env.CSF_DATABASE || 'csf_db',
  user: process.env.CSF_USERNAME || 'root',
  password: process.env.CSF_PASSWORD || '123456789',
  port: process.env.CSF_PORT || '3306',
};

const initMySQL = (config) => serverless({config}); // <-- initialize with function call

// Configure init options based on env
export const mysql = initMySQL(local);

export const executeQuery = async (query) => {
  try {
    const results = await mysql.query({...query, timeout: 100000});
    await mysql.end();
    
    return results;
  } catch (error) {
    return { error };
  }
};
// To run this code, we have to set env variables. If you’ve ever used webpack, It will be familiar.
// we can set these variables by making ‘next.config.js’ file.
