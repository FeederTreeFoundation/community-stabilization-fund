type Data = Record<string, string>;
// import type { User } from '../models';

// enum Data {
//   User,
// }
export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string, names: any[], values: any[]) =>
    `INSERT INTO ${table} (${names.join(',')}) VALUES (${values.join(',')});`,
  makeUpdateSql: (table: string, data: Data, condition: string) => {
    console.log('make update', { data });
    return `
    UPDATE ${table}
      SET ${Object.entries(data)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(',')}
      WHERE ${condition};
  `;
  },
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
  makeAuthenticateSql: (apiUser: string, token: string) => `
    SELECT users.id FROM users 
    JOIN api_keys ON users.id = api_keys.user_id 
    WHERE users.name = '${apiUser}' AND api_keys.name = '${token}'
  `,
};
