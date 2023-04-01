export function omit(key: string, obj: any) {
  const { [key]: _omitted, ...rest } = obj;
  return rest;
}