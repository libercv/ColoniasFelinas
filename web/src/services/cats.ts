import { apiCall, getCriteriaString } from '../common/util';

export const catQueryFields: string = `
  id
  createdAt
  ceasedAt
  ceaseCauseId
  ceaseCause { description }
  bornAt
  sterilized
  sterilizedAt
  imageURL
  gender
  colonyId
  colony { address }
  colorId
  color { description }
  patternId
  pattern { description }
  eyeColorId
  eyeColor { description }
  annotations { id date annotation }
`;

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export type Annotation = {
  id: number;
  date: Date;
  annotation: string;
};

export type Cat = {
  id: number;
  createdAt: Date;
  ceasedAt: Date;
  ceaseCauseId: number;
  ceaseCause: { description: string };
  bornAt: Date;
  sterilized: boolean;
  sterilizedAt: Date;
  imageURL: string;
  gender: Gender;
  colonyId: number;
  colony: { address: string };
  colorId: number;
  color: { description: string };
  patternId: number;
  pattern: { description: string };
  eyeColorId: number;
  eyeColor: { description: string };
  annotations: Annotation[];
};

export interface CatsList {
  total: number;
  items: Cat[];
}

const getCatFromGraphQlResult = (cat: Record<string, any>): Cat => {
  return {
    ...cat,
    createdAt: new Date(cat.createdAt),
    ceasedAt: new Date(cat.ceasedAt),
    bornAt: new Date(cat.bornAt),
  } as Cat;
};

export async function getCatsList({
  filter,
  page,
  perPage,
}: {
  filter?: Record<string, any>;
  page?: number;
  perPage?: number;
}): Promise<CatsList> {
  const criteria = getCriteriaString({ filter, page, perPage });

  const query = `query {
      cats (${criteria}) {
        total
        items {
          ${catQueryFields}
        }
      }
    }`;

  return await apiCall(query).then((response): CatsList => {
    const cats = response?.data?.cats;

    const total: number = cats ? cats.total : 0;
    const items: Cat[] = cats
      ? cats.items.map((cat: any): Cat => {
          return getCatFromGraphQlResult(cat);
        })
      : [];

    return { items, total };
  });
}

export async function getCat(id: number): Promise<Cat> {
  const query = `query {
    cat (id:${id}) {
      ${catQueryFields}
    }
  }`;

  return await apiCall(query).then((response): Cat => {
    return getCatFromGraphQlResult(response?.data?.cat);
  });
}
