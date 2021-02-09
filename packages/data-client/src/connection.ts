import { createConnection as ormCreateConnection } from 'typeorm';
import { UserQuote, PublicQuote } from './entities';

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_SSL,
  DATABASE_URL,
} = process.env;

export const getConnection = async () => {
  return await ormCreateConnection({
    type: 'postgres',
    name: `conn-quotes-${new Date().valueOf()}`,
    ...(DATABASE_URL
      ? {
          url: DATABASE_URL,
        }
      : {
          host: DATABASE_HOST,
          username: DATABASE_USER,
          password: DATABASE_PASS,
          database: DATABASE_NAME,
        }),
    ssl: DATABASE_SSL !== 'false' && { rejectUnauthorized: false },
    entities: [UserQuote, PublicQuote],
    synchronize: true,
    extra: { max: 10 },
  });
};
