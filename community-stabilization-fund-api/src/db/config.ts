// Require and initialize with default options
interface mysqlOptions {
    host?: string,
    database?: string,
    user?: string,
    password?: string,
    port?: string
}

const local: mysqlOptions = {
  host: process.env.ENDPOINT || 'localhost',
  database: process.env.DATABASE || 'csf_db',
  user: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '123456789',
  port: process.env.PORT || '3306',
};

const initMySQL = (config: mysqlOptions) => require('serverless-mysql')({config}); // <-- initialize with function call

// Configure init options based on env
export const mysql = initMySQL(local);

export const executeQuery = async (query: { sql: string, values?: string[] }) => {
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
