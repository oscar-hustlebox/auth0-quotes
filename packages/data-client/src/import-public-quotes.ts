import { getConnection } from './connection';
import { PublicQuote } from './entities';
// Do not TS import json
const publicQuotes = require('./quotes.json');

export const importPublicQuotes = async () => {
  const connection = await getConnection();
  const publicQuoteRepository = connection.getRepository(PublicQuote);
  await publicQuoteRepository.clear();
  await publicQuoteRepository.query(
    `ALTER SEQUENCE public_quote_id_seq RESTART;`
  );

  return await publicQuoteRepository.insert(publicQuotes);
};

(async () => {
  console.log('importing quotes.json...');
  const resp = await importPublicQuotes();
  console.log(resp);
  console.log('Complete.');
})();
