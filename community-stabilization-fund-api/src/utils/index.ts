export function omit(key: string, obj: any) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}