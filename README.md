# Contributing to GitPOAP
First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](https://github.com/gitpoap/gitpoap-fe/README.md#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

## Table of Contents
- [Code of Conduct](https://github.com/gitpoap/gitpoap-fe/README.md#code-of-conduct)
- [Ways to Contribute](https://github.com/gitpoap/gitpoap-fe/README.md#ways-to-contribute)
- [Contributing Workflow](https://github.com/gitpoap/gitpoap-fe/README.md#contributing-workflow)
- [Getting Started Locally](https://github.com/gitpoap/gitpoap-fe/README.md#getting-started-locally)
- [Scripts](https://github.com/gitpoap/gitpoap-fe/README.md#scripts)
  - [Testing](https://github.com/gitpoap/gitpoap-fe/README.md#testing)
  - [GraphQl Code Generation](https://github.com/gitpoap/gitpoap-fe/README.md#testing)

## Code of Conduct

This project and everyone participating in it is governed by the
[gitpoap-fe Code of Conduct](https://github.com/gitpoap/gitpoap-fe/CODE_OF_CONDUCT.md).

By participating, you are expected to uphold this code. Please report unacceptable behavior
to <team@gitpoap.io>.

## Ways to Contribute
- **Improve documentation:** Fix incomplete or missing docs, bad wording, examples or explanations.
- **Give feedback:** Please share how you use GitPOAP, what features are missing, and what is done well via our [Discord](https://discord.gg/qa3mfPvjWm).
- **Contribute to the codebase:** Propose new features via [GitHub Issues](https://github.com/gitpoap/gitpoap-fe/issues/new) or our [Discord](https://discord.gg/qa3mfPvjWm).
- **Give us a code review:** Help us identify problems with the source code or make GitPOAP more performant.
- **Share GitPOAP:** Share GitPOAP with anyone who might be interested! 

## Contributing Workflow
First, read our [docs on contributing](https://github.com/gitpoap/gitpoap-fe/CONTRIBUTING.md).

If this is your first time contributing to open source, congrats! We also recommend you read this [guide to git best practices](https://www.freecodecamp.org/news/git-best-practices-commits-and-code-reviews/).

- Decide on what you want to contribute.
- If you want to implement a new feature, propose it on [Discord](https://discord.gg/qa3mfPvjWm) before jumping into coding.
- After finalizing issue details, as you begin working on the code, please make sure to follow commit conventions.
- Run tests with npm test and submit a PR once all tests have passed.
- Get a code review and fix all issues noticed by the maintainer.
- If you cannot finish your task or if you change your mind – that's totally fine! Just let us know in the GitHub issue that you created during the first step of this process.
- Your PR is merged. You are awesome and we'll give you a GitPOAP to prove it! 

## Getting Started Locally
This is a [Next.js](https://nextjs.org/) project - view the [docs](https://nextjs.org/docs/getting-started) for more info.

Example `.env`
```bash
NEXT_PUBLIC_SENTRY_DSN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_ENVIRONMENT='development'
SENTRY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_INFURA_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_REACT_APP_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GITPOAP_API_URL=http://localhost:3001
NEXT_PUBLIC_PRIVY_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_AMPLITUDE_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- Fork the repository, then clone or download your fork.
- Install dependencies with yarn – `yarn`
- To run the development server - `yarn dev` or `npm run dev`
  - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  - To run the development server with the production api: `yarn dev:prod-api`
- To start storybook – `npm run storybook`
  - View the component library on a deployed version of [Storybook](https://gitpoap-fe-storybook.vercel.app/?path=/story/button--primary0).

## Scripts
All scripts can be located at [main package.json](https://github.com/gitpoap/gitpoap-fe/blob/main/package.json).

### Testing
`yarn test`: Run local jest tests

`yarn test:ci`: Run jest tests as they appear on ci

### GraphQL Code Generation
`yarn gql:generate-dev`: Generate graphql hooks and types based on a local version of `schema.graphql` found in `gitpoap-backend`

`yarn gql:generate`: Generate graphql hooks and types based on the graphql schema found at `api.gitpoap.io/graphql`
