import type { UserProfile } from "@auth0/nextjs-auth0";

import { isEmpty } from "./common";

export function getRoles(user?: UserProfile) {
  if(isEmpty(user)) return [];

  for (const key in user) {
    if (key.includes('role') && user[key]) {
      return user[key] as string[];
    }
  }
}