<h1 align="center">startkit-next</h1>

<div align="center">
  <strong>A sane way to start your next Next.js project</strong>
  <p>A type-safe starter project following the latest best practices</p>
</div>

## Features

- ✅ The latest **Next.js** (v15 rc)
- ✅ **Bun** package manager and test runner
- ✅ Complete type-aware linting with **Eslint 9**
- ✅ Beautiful code-style from **Prettier**
- ✅ Automatic CI with **Github Actions**
- ✅ Type-safe environment variables via **t3-env**
- ✅ **Tailwind CSS** for utility-first CSS
- ✅ Automatic **sitemap.xml**, **robots.txt**, and **manifest** generation
- ✅ Database support via **Drizzle ORM** and **Cloudflare D1**
- ✅ Authentication (OAuth2) via **Lucia**

## Installation

```sh
git clone git@github.com:startkit-dev/next.git <your-project-name>
```

Once cloned, you can run the setup script to get everything initialized:

```sh
bun run setup
```

## Usage

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Scripts

The project comes with some useful scripts.

```sh
bun check         - Perform a full check of the repo (lint, format, test, and type-check)
bun fix           - Fix any lint and formatting issues
bun lint          - Lint the repository
bun format:check  - Check the formatting of the repository
bun format        - Fix any formatting issues
bun run outdated  - Find any outdated packages
```

## Environment Variables

There are several environment variables that are required for using the app.

Server-only environment variables (`./env/server.ts`)

## Database

You must create a db

```
bun wrangler d1 create startkit-next-d1
bun wrangler d1 create startkit-next-d1-preview --env preview
```

### Migrating

Locally:

```sh
bun db:migrate --local
```

Remotely:

This happens automatically during deploy via the `bin/release` script. The migration occurs as the final step of the build process before the new code is deployed to the Cloudflare Edge network.

Because of this zero-downtime deployment, there is a small timeframe where the database is migrated and the previous code is still live (before the new code is live). Please be sure to write your migrations accordingly.

## Queues

You can enable background jobs within the same app via [Cloudflare Queues](https://developers.cloudflare.com/queues/) by [adding a custom entryponit](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/advanced/#custom-worker-entrypoint) and defining the queue handler.

For example:

```ts
import nextOnPagesHandler from "@cloudflare/next-on-pages/fetch-handler"

export default {
  fetch: nextOnPagesHandler.fetch,
  async queue(batch: MessageBatch<TYPE>, env: Environment) {
    // process logic
  }
} as ExportedHandler<{ ASSETS: Fetcher }>
```
