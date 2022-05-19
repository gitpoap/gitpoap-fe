# Automated GraphQL Types & Hooks Generation

This document describes describe how automatic type & hook generation works for **frontend** graphql related code - specifically queries & their respective parameter & response types.

`graphql-code-generator` is configured to automatically generate `urql` query hooks based on the local `gitpoap-backend/schema.graphql` (schema) file, and the `gitpoap-fe/src/graphql/operations.graphql` (frontend query definitions) file. The generated hooks implicitly contain the correct query parameter & response types, and the operations manually defined in `operations.graphql` are validated against `schema.graphql`.

To run the graphql code generation tool, run `yarn gql:generate` - generates code based on the schema found at `api.gitpoap.io/graphql` that is based on `main`.

To run the tool for development purposes, run `yarn gql:generate-dev`. Ensure that `gitpoap-backend` is located in the same parent directory as `gitpoap-fe`. This generates code based on the query definitions found in `../gitpoap-fe/operations.gql` & validates the queries against the schema found at `../gitpoap-backend/schema.graphql`.

Development Workflow
---
- Make a schema change in `gitpoap-backend/../schema.prisma`.
- Make changes to queries & requested data in `gitpoap-fe/../operations.gql`.
- Run `yarn gql:build-schema` to run the migration & regenerate `gitpoap-backend/../schema.graphql`.
- Run `yarn gql:generate-dev` to regenerate hooks and types in `gitpoap-fe/../generated-gql.tsx`.
- Commit any changes made to files (`generated-gql.tsx` or `operations.graphql`) within `gitpoap-fe`.

Notes
---
- Codegen config is located in `codegen.yml` and `codegen-dev.yml`.
- Change the path to `schema.graphql` in `codegen-dev.yml` if necessary.
