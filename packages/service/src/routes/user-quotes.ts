import express from 'express';
import { getConnection, UserQuote } from '@auth0/devpro-exercise-scaffold-data';

const router = express.Router();

router
  .get('/', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { userId } = req.query;

    const quotes = await quoteRepository.find(
      !!userId && { where: { userId } }
    );

    res.send(quotes);

    await connection.close();
  })
  .post('/', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { text, userId, authorName } = req.body;
    const quote = new UserQuote();
    Object.assign(quote, { text, userId, authorName });
    const resp = await quoteRepository.save(quote);

    res.send(resp);

    await connection.close();
  })
  .get('/:id', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { id } = req.params;

    const quote = await quoteRepository.findOne(id);

    res.send(quote);

    await connection.close();
  })
  .patch('/:id', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { id } = req.params;
    const { text, userId, authorName } = req.body;

    const quote = await quoteRepository.findOne(id);
    Object.assign(quote, { text, userId, authorName });
    await quoteRepository.save(quote);

    res.send(quote);

    await connection.close();
  })
  .delete('/:id', async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { id } = req.params;

    const quote = await quoteRepository.findOne(id);

    const resp = await quoteRepository.remove(quote);
    res.send(resp);
    await connection.close();
  });

export { router as userQuotesRouter };
