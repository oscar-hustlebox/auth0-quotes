import { Like, ILike } from 'typeorm';
export { FindManyOptions, FindConditions } from 'typeorm';
export * from './connection';
export * from './connection';
export * from './entities';

export const Operators = {
  Like,
  ILike,
};
