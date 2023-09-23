import type { DataTableHeader, DataTableRow } from "carbon-components-react";

export function omit(key: string, obj: any) {
  const { [key]: _omitted, ...rest } = obj;
  return rest;
}

export function isEmpty(value?: any | any[] ) {
  return value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
}

export function createHeaders<T extends {}>(item: T = {} as T) {
  const headers = Object.keys(item).map((key) => ({
    key,
    header: key.replace(/_/g, ' ').toUpperCase(),
  }));

  return headers as DataTableHeader[];
}

export function createRows<T extends {}>(items: T[], idKey: keyof T) {
  const rows = items.map((item) => ({
    ...item,
    id: item[idKey],
  }));

  return rows as DataTableRow<string>[];
}