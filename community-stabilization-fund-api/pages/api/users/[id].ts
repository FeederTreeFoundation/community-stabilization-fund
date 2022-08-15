import { NextApiRequest, NextApiResponse } from "next";

const users: User[] = [
	{ id: "1", name: 'John Smith', apiToken: '', isDeleted: false },
	{ id: "2", name: 'Jane Doe', apiToken: '', isDeleted: false },
];

type User = {
  id?: string;
  name?: string;
  apiToken?: string;
  isDeleted?: boolean;
}

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const userId = query.id as string;

  switch (method) {
    case 'GET':
      getUserById(userId, res)
      break;
    case 'DELETE':
      deleteUserById(userId, res)
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

const getUserById = (id: string, res: NextApiResponse) => {
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.json({...user});
}

const deleteUserById = (id: string, res: NextApiResponse) => {
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.json({...user, isDeleted: true});
}

export default userHandler;