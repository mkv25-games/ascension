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

### Local Invoke

To involve a local function - which is a test of the build process, use:
```
npm run invoke functionName
```

## Releasing

Deployments will eventually be triggered automatically by merging to `main` or `master` using the `deploy-server.yml` workflow.

The workflow is:
- Build and Test
- Deploy to Production

The plan is to use AWS for hosting; and all server development will be done through serverless and CDK scripts to create serverless infrastructure.
