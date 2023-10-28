# Contributing

## Development

If you would like to contribute by fixing an open issue or developing a new feature you can use this suggested workflow:

- First fork the repository,
  - Create a new feature branch off the `main` branch.
- Second, install the dependencies of the monorepo:

```bash
pnpm install
```

- Run web server:

```bash
pnpm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see a rudimentary playground.
- Open [http://localhost:3001](http://localhost:3001) with your browser to see the docs.

- Make and commit desired changes.

  - Make sure to run `pnpm run lint --fix` before commiting to ensure that there are no linting errors.

- Finally, submit a pr from your forked branch to the main branch
