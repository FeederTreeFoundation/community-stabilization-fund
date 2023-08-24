import { createContext } from 'react';

import type { UserDTO } from '../../../db';

interface ApiUserContextProps {
  apiUser?: UserDTO;
  updateApiUser?: Function;
}

export const ApiUserContext =
  createContext<ApiUserContextProps>({ apiUser: {} as UserDTO });