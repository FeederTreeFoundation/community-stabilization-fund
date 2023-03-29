import {NULL} from "sass";

type Data = Record<string, string>;
// import type { User } from '../models';

export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string, body: any) =>{
    const names = Object.keys(body);
    const unquoted_values = Object.keys(body);
    const values = unquoted_values.map((value) =>{
      if(typeof (value) === "undefined") return 'NULL';
      return typeof value === 'string' ? `"${value}"` : value;
    });

    return `INSERT INTO ${table} (${names.join(',')}) VALUES (${values.join(',')});`;

  },
  makeUpdateSql: (table: string, data: Data, condition: string) =>
    `
    UPDATE ${table}
      SET ${Object.entries(data)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(',')}
      WHERE ${condition};
  `,
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
  makeAuthenticateSql: (apiUser: string, token: string) => `
    SELECT api_user.id FROM api_user
    JOIN api_key ON api_user.id = api_key.api_user_id
    WHERE api_user.name = '${apiUser}' AND api_key.name = '${token}'
  `,
  truncateTableSql: (table: string) => `TRUNCATE TABLE ${table}`,
};
