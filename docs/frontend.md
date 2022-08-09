# Frontend

The goal of this document is to enable the team to work faster, more effectively, with a great degree of standardization, & more autonomy in all related repos at GitPOAP. This is a living document that will change over time.

That said, we'll start by offering a set of best practices and answers to general engineering related questions that commonly arise.


## Table of Contents
- [Best Practices](#best-practices)
  - [Typescript](#typescript)
  - [Code Formatting](#code-formatting)
  - [Code Style](#code-style)
  - [Linting](#linting)
  - [Type Safety](#type-safety)
- [FAQ](#faq)
  - [What is the purpose of redeem codes?](#what-is-the-purpose-of-redeem-codes)
  - [How to run the backend server?](#how-to-run-the-backend-server)
  - [How to run the frontend server?](#how-to-run-the-frontend-server)
  - [How do migrations work?](#how-do-migrations-work)
  - [How do you connect to the production DB client?](#how-do-you-connect-to-the-production-db-client)
  - [How do you automatically generate GraphQL types & React hooks on the frontend?](#how-do-you-automatically-generate-graphql-types-react-hooks-on-the-frontend)


## Best Practices


### TypeScript
All code related to frontend applications, and the vast majority of code in general at GitPOAP should be written in TypeScript with `strict-mode` enabled and use meaningful type declarations.


### Code Formatting
All code should be formatted by prettier in the `gitpoap-fe` & `gitpoap-backend` repos. In general, the larger repos have pre-commit hooks enabled by `husky` that check for any code formatting violations, and prevent committing as a result. The code formatting standard that we use is the relatively uncontroversial, but highly opinionated `prettier/prettier` rule set, in addition to a small number of custom rules defined by the team in various `.prettierrc` files at the root of various repositories. Please refrain from adding your own rules here without first gaining consensus from the rest of the team.


### Code Style & Preferences
All code should be written in a consistent style. This is a very important part of the team's culture, and we expect all code to be written in a consistent style to reduce the amount of work needed to maintain the codebase & vastly minimize the amount of time & attention wasted on debating code style.

1. Write comments with the style `/* comment body */`.

2. Use `const` instead of `let` or `var` wherever possible.

3. Name boolean variables as a question - `isSomething` instead of `something`.

4. Use the null coalescing operator `??` instead of `||` and `&&` operators whenever possible.

5. Minimize the use of `any` and `as` for type assertions. Use `unknown` and type guards instead.

6. Use line breaks to make code more readable.

7. For frontend code, use common shared elements as frequently as possible.

8. Use a validation library like `zod` instead of writing your own.

9. *Never* use `// @ts-ignore` in production code. Let TypeScript do its job.

10. Break up large components into smaller ones.


### Linting

We are using ESLint using the community standard settings for `react` and `typescript`. Please take the time to remove any errors in code that you happen to be working on if you notice any present, and avoid adding new errors or warnings.

### Type Safety
We are leveraging TypeScript for type safety in our repository. It goes without saying that static typing provides several benefits for developers and engineering organizations in general - the important benefits are enumerated here:

1. No more `undefined is not a function`, `cannot access property x of undefined`. When we write code without being forced to think about the types, it's easy to improperly infer and assume what the parameters & return types of a function actually are.

2. Improved refactorability & scalability. TypeScript reduces the time and mental focus required for refactoring, while increasing confidence & improving the quality of refactors. It reduces a lot of the mental overhead associated with remembering the interfaces & shapes of various functions & objects. As we make changes to the code, TypeScript will conveniently notify the developer of changes that fail typechecking and break parts of the application.

3. Documentation. TypeScript enables self-documenting code and allows engineers to click through function calls, variables, and types, to quickly understand how things work.

For us to maximally benefit from the use of TypeScript, it's important that we let TypeScript do its job, refrain from disabling type-checking via `any`, and minimize the use of typecasting via `as` or `<>`.

At the same time, there are instances where the type of an object is not known & the temptation to use `any` arises. An example of this is a JSON response from a third party API - here we can assume, but not know definitively what the structure of the response is unless provided to us via an SDK. For this situation, TypeScript has the keyword `unknown`. While `unknown` is similar to `any`, it has one large difference. Namely, instead of implying that a value can be of `any` type and exiting typechecking, `unknown` implies that the type could be anything, but is not known & must be asserted or derived a priori via type narrowing or type guards (`instanceof`, `typeof`).


## FAQ

### What is the purpose of redeem codes?
Redeem codes are a key component of workflow associated with using the POAP API & related services. A redeem code is a 6-char random string that is associated with a particular POAP `event_id` & are issued during the initial creation of a POAP event. The total amount of remaining valid redeem codes can be extinguished, resulting in the need to request additional codes on a discretionary basis later in time.

When a user attempts to mint a new POAP, either they, or the application they are using must provide a valid redeem code for that specific POAP as specified by an `event_id`. Ostensibly, the purpose of a redeem code is to add a line of defense against POAP farming activities.

### How to run the backend server?
To start an instance of the server found in `gitpoap-backend`, first run `yarn docker:background` in one terminal pane, and then run `./.dockerfiles/run-server.sh` in separate terminal pane.

The first command `yarn docker:background` starts all services in the backend stack except for the server itself. For example, it starts a fake-poap-api, fake-poap-auth, postgres, prometheus, redis, & grafana.

The second command `./.dockerfiles/run-server.sh` runs the initial DB migrations, seed script, and then starts the server.

Since the seed script can't be run twice, run `yarn dev --level debug` instead of `run-server.sh` in order to start the backend after running `run-server.sh` once.

### How to run the frontend server?
To start an instance of the server found in `gitpoap-fe`, simply run `yarn` to install all packages, and then run `yarn dev`.

### How do migrations work?
Migrations are granular sets of database schema changes that track the evolution of the schema over time. A benefit of this practice is the ability to track schema changes over time within a version control system such as Git.

When setting up a development environment, migrations are applied sequentially to a new, untouched DB. Iterating through all the migrations associated with a database will result in a database with a schema that reflects its current form.

To run migrations within the `gitpoap-backend` repository, do the following. First, make your schema change within `schema.prisma`, then run `npx prisma migrate dev --name <name>` to generate the migration file. Finally, commit these changes to a version control system.

For more information, refer to the prisma [documentation on migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate).


### How do you connect to the production DB client?
To connect to the production DB client, ask a senior member of the team for the `.pem` file that contains the ssh private key needed to access the box. Then, run the following command in a separate terminal pane.

```bash
ssh -i .ssh/db-client-key-pair.pem ubuntu@ec2-18-220-67-80.us-east-2.compute.amazonaws.com
```

### How do you generate GraphQL types & React hooks on the frontend?
To run the graphql code generation tool, run `yarn gql:generate` - this generates code based on the schema found at `api.gitpoap.io/graphql` that is based on the `main` branch.

To run the tool for development purposes, run `yarn gql:generate-dev`. Ensure that `gitpoap-backend` is located in the same parent directory as `gitpoap-fe`. This generates code based on the query definitions found in `../gitpoap-fe/operations.gql` & validates the queries against the schema found at `../gitpoap-backend/schema.graphql`.

For more information, refer to the doc [gql-typegen.md](gql-typegen.md).


