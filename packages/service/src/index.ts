import express from 'express';
import { getConnection } from '@auth0/devpro-exercise-scaffold-data';
import { publicQuotesRouter, userQuotesRouter } from './routes';

(async () => {
  // Test connection
  try {
    const conn = await getConnection();
    await conn.close();
  } catch (e) {
    console.log(
      'Unable to connect to database. Please check your environment settings.'
    );
    console.error(e);
    return;
  }

  const app = express();
  const port = process.env.PORT || 3002;

  app.use(express.static('../spa/build'));

  app.use(express.json());

  app.get('/api', (req, res) => {
    res.send({ body: 'Hello from API!' });
  });

  app.use('/api/user-quotes', userQuotesRouter);
  app.use('/api/public-quotes', publicQuotesRouter);

  app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`);
  });
})();
