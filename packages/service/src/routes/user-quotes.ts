import express from 'express';
import { getConnection, UserQuote } from '@auth0/devpro-exercise-scaffold-data';

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-v5k0yq0h.us.auth0.com/.well-known/jwks.json'
      }),
      audience: 'https://quotesapp.com/api',
      issuer: 'https://dev-v5k0yq0h.us.auth0.com/',
      algorithms: ['RS256']
    });

    next();
  } else {
    res.sendStatus(401);
  }
};

router
  .get('/', authenticateJWT, async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { userId } = req.query;

    const quotes = await quoteRepository.find(
      !!userId && { where: { userId } }
    );

    res.send(quotes);

    await connection.close();
  })
  .post('/', authenticateJWT, async (req, res) => {
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
  .patch('/:id', authenticateJWT, async (req, res) => {
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
  .delete('/:id', authenticateJWT, async (req, res) => {
    const connection = await getConnection();
    const quoteRepository = connection.getRepository(UserQuote);
    const { id } = req.params;

    const quote = await quoteRepository.findOne(id);

    const resp = await quoteRepository.remove(quote);
    res.send(resp);
    await connection.close();
  });

export { router as userQuotesRouter };
