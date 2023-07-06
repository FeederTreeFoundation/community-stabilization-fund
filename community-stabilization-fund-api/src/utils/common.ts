export function omit(key: string, obj: any) {
  const { [key]: _omitted, ...rest } = obj;
  return rest;
}

export function isEmpty(value?: any | any[] ) {
  return value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
}