# Ascension Server

Infrastructure and game code hosted on a shared server:

- World Database(s)
- Game Update Lambda
- Websocket API
- Game Action Lambdas
- Cognito Authorisation
- User Account Database

## Where to begin?

Follow this guide...
- https://serverless-stack.com/chapters/why-create-serverless-apps.html

## Development

For set up locally, clone the parent repo, and change into the `server` folder, then run:
```
npm install
```

### Start

To view the web clients, start vuepress running locally using:
```
npm start
```

### Linting

To lint files in the project, run:
```
npm run lint
```

### Testing

To lint and test files, run:
```
npm run lint -s && npm test -s
```

Javascript files and helper methods should be tested by adding unit tests to `tests/unit`.

## Releasing

Deployments will eventually be triggered automatically by merging to `main/master`.

Environments will also be created so that changes can be promoted from dev/qa to production.

The plan is to use AWS for hosting; and all server development will be done through CDK scripts to create serverless infrastructure.
