export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string) => `INSERT INTO ${table} (name) VALUES (?);`,
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
  makeAuthenticateSql: (apiUser: string, token: string) => `
    SELECT users.id FROM users 
    JOIN api_keys ON users.id = api_keys.user_id 
    WHERE users.name = '${apiUser}' AND api_keys.name = '${token}'
  `,
};