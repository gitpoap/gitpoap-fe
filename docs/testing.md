# Testing

## Table of Contents
- [Philosophy & Best Practices](#philosophy--best-practices)
- [General Patterns](#general-patterns-for-frontend-testing)
- [Snapshot Testing](#snapshot-testing)

## Philosophy & Best Practices

0. Write tests, not too many, mostly integration.

1. Avoid testing internals unless you really need to.

2. Tests should be deterministic.

3. Avoid unnecessary assertions & strive for brevity.

4. Don't strive for 100% coverage.

5. Try to test in a way that mimics user flows.


## General Pattern for Frontend Tests

1. Render a component using a `testing-library` helper function - i.e. `render`.

2. Use a query selector to get the dom element you wish to test.

3. Use assertions to test certain important attributes or properties of the dom element.

4. For components, test against the snapshot to detect up unforeseen changes.


## Snapshot Testing

### What is snapshot testing?
Instead of executing some code and comparing the output against a value provided by a developer, in snapshot testing, the first time a test is run, the output is passed into the test and saved to a “snapshot file”. When the test is run in the future, the output is compared to the snapshot file.

### When do you use snapshot tests?
Classic assertion based tests are perfect for testing clearly defined behavior that is expected to remain relatively stable.

Snapshot tests are great for testing less clearly defined behavior that may change often. Snapshot testing is great for tests that in the past would have raised concern for being ‘overly brittle’ that slow down development teams, such as certain UI tests.

UI components often change in small and trivial ways. Copy is changed, whitespace is added, a border color is modified. Generally this means that developers have to choose between detailed tests that catch any regression but require constant updates, or less detailed tests that focus on core behaviors but miss smaller regressions.

**Snapshot testing provides a new way of approaching these unit tests these problems in unit tests. Because they are easy to write and effortless to update, and provide a clear view of what changed after each update, whether it is major or minor.**

This isn’t without any disadvantage. Snapshot tests preserve a starting point, but don’t give any indication of developer intent to future developers. Like any other test, if the initial snapshot passes with bugs, or doesn’t capture the full range of cases, the test won’t adequately cover those behaviors. But unlike traditional tests, snapshot tests don’t provide specific guidance for what the original developer expected beyond the “actual behavior”.

If there are multiple sub-behaviors that interact to produce output, its not clear which of those are essential, and which are incidental. That’s not something you want for your critical application logic, especially complicated logic with many subtle cases. But for UI components and other application elements that are likely to change a lot over time, this is a good set of tradeoffs.

### How & when do you update snapshots?
You update snapshots with
```
jest —updateSnapshot --testNamePattern <optional-pattern>
```
or

```
jest -u --testNamePattern <optional-pattern>
```

### Is there an easy way to do snapshot testing with Jest? What tools does jest offer specifically for snapshot testing?
Jest comes with an interesting interactive snapshot testing tool.

### What are some snapshot testing best practices?
1. Treat snapshots as code & review changes well.

2. Tests should be deterministic & the outcome should not change if the test is run multiple times without changing anything.
3. All snapshot files & any changes should be reviewed & committed
4. Do not do TDD with snapshot tests

## References
1. [Jest Documentation](https://jestjs.io/docs/en/getting-started)
2. [Jest Snapshot Testing Documentation](https://jestjs.io/docs/snapshot-testing)
3. [React Testing Library Documentation](https://testing-library.com/docs/)

## Articles
1.  [React Testing Best Practices](https://blog.sapegin.me/all/react-testing-1-best-practices/)



