# DevPro Exercise Starter

A starter project pre-configured with dependencies and tooling for application development and deployment.
See [EXERCISE.md](EXERCISE.md) for the exercise requirements.

## Requirements

- Node.js (LTS)
- Yarn
- Postgres
- Heroku (see [Deployment](README.md#Deployment))

## Structure

#### `./packages/spa`

A single-page app generated by [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

#### `./packages/service`

A backend service with API routes using [Express](https://expressjs.com/).

#### `./packages/data-client`

A library for Postgres data access using [TypeORM](https://typeorm.io/#/).

## Getting Started

For local development, you can point to a local instance of Postgres or your provisioned Heroku DB.

Set your Postgres DB connection settings by copying `.env.example` => `.env` and updating the values to match your configuration.

From the project root, install the dependencies:

```bash
yarn
```

To create the DB schema and populate the `public_quote` table with data, run:

```
cd ./packages/data-client
yarn import-quotes
```

#### Local development

To run the spa in development mode:

```bash
cd packages/spa
yarn start
```

To run the service in development mode:

```bash
cd packages/service
yarn dev
```

Or you can run both client and service with a single command:

```bash
cd packages/spa
yarn dev:all
```

To run the service with linting enabled:

```bash
cd packages/service
yarn dev:wlint
```

## Deployment

The application can be deployed to Heroku with the Postgres add-on.

## API

The service exposes API routes for accessing both public and user quotes data.

### `GET /api/public-quotes`

#### Query parameters

##### Filtering

- `authorName`: Case-insensitive partial matches
- `text`: Case-insensitive partial matches on quote text

##### Sorting

- `sortBy`: Comma-separated list of sort properties. Prefix property name with `-` for descending order.

##### Pagination

- `start`: Index of the first record to retrieve
- `limit`: Number of records to retrieve

### `GET /api/user-quotes`

#### Query parameters

##### Filtering

- `userId`: Id of user who created the quote

### `GET /api/user-quotes/:id`

#### Path parameters

- `:id`: Id of the quote record

### `POST /api/user-quotes`

Create a new quote

#### Body format

```js
 {
   "authorName": <string>,
   "text": <string>,
   "userId": <string>
 }
```

### `PATCH /api/user-quotes/:id`

Update quote by id

### `DELETE /api/user-quotes/:id`

Delete quote by id

## Troubleshooting

### VS Code use of JSX

If you see TS errors or warnings in VS Code such as:

```

Cannot use JSX unless the '--jsx' flag is provided.

```

Update your workspace to use the local version of TypeScript (Cmd+P -> Type "> TypeScript: Select TypeScript version" -> Select "Use Workspace Version")

### Port in use by ts-node-dev 

If after closing a dev server and trying to run a new one you see this error:

```
EADDRINUSE: address already in use
```

Try closing the server manually on signal: 

```
  ['exit', 'SIGINT', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
    process.on(eventType as any, () => {
      server.close();
    });
  });
```

For more information see the issue on Github:
https://github.com/wclr/ts-node-dev/issues/120