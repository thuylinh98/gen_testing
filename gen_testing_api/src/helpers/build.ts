import { Types } from 'mongoose';

const { ObjectId } = Types;

export const buildFindingQuery = ({ query }) => {
  const {
    sortBy = '_id',
    limit,
    cursor,
    sortDirection,
    ...findingQuery
  } = query;
  const validDirection: number = sortDirection === 'ASC' ? 1 : -1;
  const hasPage = !!limit;
  const sortingCondition = { [sortBy]: validDirection };

  for (const key in findingQuery) {
    if (Array.isArray(findingQuery[key])) {
      findingQuery[key] = { $in: findingQuery[key] };
    }
  }

  const findAllQuery = { ...findingQuery };

  if (!limit) {
    return {
      findAllQuery,
      findingQuery,
      sortingCondition,
      hasPage,
    };
  }

  if (!cursor) {
    return {
      sortingCondition,
      findingQuery,
      findAllQuery,
      hasPage,
    };
  }

  const condition = validDirection === 1 ? '$gt' : '$lt';
  findingQuery[sortBy] = { [condition]: cursor };

  return {
    sortingCondition,
    findingQuery,
    findAllQuery,
    hasPage,
  };
};

export const buildFindingQueryByObject = ({ query, objectKeys }) => {
  if (!objectKeys) {
    return query;
  }

  for (const key in objectKeys) {
    if (query[key]) {
      query[objectKeys[key]] = query[key];
      delete query[key];
    }
  }

  return query;
};

export const buildRegexQuery = ({ query, regexFields }) => {
  if (!regexFields || !regexFields.length) {
    return query;
  }

  for (const key of regexFields) {
    if (!query[key]) {
      continue;
    }
    query[key] = { $regex: query[key], $options: 'gmi' };
  }

  return query;
};
