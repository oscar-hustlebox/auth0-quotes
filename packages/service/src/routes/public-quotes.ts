import express from 'express';
import {
  getConnection,
  PublicQuote,
  Operators,
  FindManyOptions,
  FindConditions,
} from '@auth0/devpro-exercise-scaffold-data';

const router = express.Router();

router
  .get('/', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(PublicQuote);
    const { authorName, text, start = 0, limit = 10, sortBy = '' } = req.query;

    const filters = {} as FindConditions<PublicQuote>;
    if (!!authorName) {
      filters.authorName = Operators.ILike(`%${authorName}%`);
    }

    if (!!text) {
      filters.text = Operators.ILike(`%${text}%`);
    }

    const order = {};
    if (!!sortBy) {
      const sortParts = (sortBy as string).split(',');
      sortParts.forEach((p) => {
        if (p.startsWith('-')) {
          order[p.substr(1)] = 'DESC';
          return;
        }

        order[p] = 'ASC';
      });
    }

    const [results, total] = await quoteRepository.findAndCount({
      where: filters,
      order,
      take: limit,
      skip: start,
    } as FindManyOptions<PublicQuote>);

    res.send({
      results,
      total,
      start,
      limit,
    });

    await connection.close();
  })
  .get('/:id', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(PublicQuote);
    const { id } = req.params;

    const quote = await quoteRepository.findOne(id);
    res.send(quote);
    await connection.close();
  });

export { router as publicQuotesRouter };
