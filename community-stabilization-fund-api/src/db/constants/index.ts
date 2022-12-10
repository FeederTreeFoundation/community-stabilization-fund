export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string) => `INSERT INTO ${table} (name) VALUES (?);`,
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
};