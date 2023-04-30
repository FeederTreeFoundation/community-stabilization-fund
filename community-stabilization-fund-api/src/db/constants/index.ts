import { isEmpty } from "../../utils";

type Data = Record<string, string>;

export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string, body: any) => {
    const names = Object.keys(body);
    const unquoted_values = Object.values(body);
    const values = unquoted_values.map((value) => {
      if(isEmpty(value)) return 'NULL';
      return typeof value === 'string' ? `"${value}"` : value;
    });

    return `INSERT INTO ${table} (${names.join(',')}) VALUES (${values.join(',')});`;

  },
  makeUpdateSql: (table: string, data: Data, condition: string) => `
    UPDATE ${table}
      SET ${Object.entries(data)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(',')}
      WHERE ${condition};
  `,
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
  makeBulkDeleteSql: (table: string, ids: string[]) =>
    `DELETE FROM ${table} WHERE id in (${ids.join(',')});`,
  makeAuthenticateSql: (apiUser: string, token: string) => `
    SELECT api_user.id FROM api_user
    JOIN api_key ON api_user.id = api_key.api_user_id
    WHERE api_user.name = '${apiUser}' AND api_key.name = '${token}'
  `,
  makeJoinByForeignKeySQL: (table: string, foreign_key: string) => 
    `SELECT * FROM ${table} AS b INNER JOIN ${foreign_key} AS a ON (b.${foreign_key}_id=a.id)`,
  truncateTableSql: (table: string) => `TRUNCATE TABLE ${table}`,
};
