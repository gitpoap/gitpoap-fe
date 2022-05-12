# Automated GraphQL Types & Hooks Generation

This document describes describe how automatic type & hook generation works for **frontend** graphql related code - specifically queries & their respective parameter & response types.

To run the graphql code generation tool, run `yarn gql:generate` - generates code based on the schema found at `api.gitpoap.io/graphql` that is based on `main`.

To run the tool for development purposes, run `yarn gql:generate-dev`. Ensure that `gitpoap-backend` is located in the same parent directory as `gitpoap-fe`. This generates code based on the schema found at `../gitpoap-backend/schema.graphql`.

How it works
---
In the `gitpoap-fe` repo, `graphql-code-generator` is configured to automatically generate urql query hooks based on the local `schema.graphql` file found in the `gitpoap-backend` repo, and the `src/graphql/operations.graphql` file found in the `gitpoap-fe` repo.

The generated hooks implicitly contain the correct query parameter & response types, and the operations manually defined in `operations.graphql` are validated against `schema.graphql`.

Development Workflow
---
- Make a schema change in `schema.prisma` in `gitpoap-backend`.
- Run `yarn gql:build-schema` to run the migration & regenerate `schema.graphql` in `gitpoap-backend`.
- Run `yarn gql:generate-dev` to regenerate hooks and types in `gitpoap-fe`.


Notes
---
- Commit any changes made to generated files within `gitpoap-fe`.
- Codegen config is located in `codegen.yml` and `codegen-dev.yml`.
- Change the location of `schema.graphql` in `codegen-dev.yml` if necessary.
