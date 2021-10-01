import { apiCall, getCriteriaString } from '../common/util';

export const userQueryFields: string = `
  id
  createdAt
  name
  surnames
  phoneNumber
  email
  roleId
`;

export enum RoleId {
  Admin = 1,
  Manager = 2,
}

export const getRoleName = (id: number): string => {
  switch (id) {
    case RoleId.Admin:
      return 'Admin';
    case RoleId.Manager:
      return 'Gestora';
    default:
      return '';
  }
};

export type User = {
  id: number;
  createdAt: Date;
  name: string;
  surnames: string;
  phoneNumber: number;
  email: string;
  roleId: number;
};

export interface UsersList {
  total: number;
  items: User[];
}

const getUserFromGraphQlResult = (user: Record<string, any>): User => {
  return {
    ...user,
    createdAt: new Date(user.createdAt),
  } as User;
};

export async function getUsersList({
  filter,
  page,
  perPage,
}: {
  filter?: Record<string, any>;
  page?: number;
  perPage?: number;
}): Promise<UsersList> {
  const criteria = getCriteriaString({ filter, page, perPage });

  const query = `query {
      users (${criteria}) {
        total
        items {
          ${userQueryFields}
        }
      }
    }`;

  return await apiCall(query).then((response): UsersList => {
    const users = response?.data?.users;

    const total: number = users ? users.total : 0;
    const items: User[] = users
      ? users.items.map((user: any): User => {
          return getUserFromGraphQlResult(user);
        })
      : [];

    return { items, total };
  });
}
