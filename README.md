# AroundU

## Overview

AroundU is an app that allows users to browse upcoming and ongoing local events. It shows the time, date, and distance of events relative to the user. The app is designed to help users find activities and connect with others in their community.

## Installation

### 1. Pull the Latest Code

```bash
git pull upstream main
```

### 2. Install Dependencies

To install dependencies in the root, `/server`, and `/web` directories:

```bash
npm install && cd server && npm install && cd ../web && npm install && cd ..
```

### 3. Build and Start Containers

```bash
docker compose up -d --build
```

## Development

### Accessing Containers

To access the running containers for debugging or inspection:

```bash
docker exec -it <container_name> sh
```

### Accessing MongoDB

To access the running MongoDB instance for debugging or inspection:

```bash
docker exec -it aroundu-mongo mongosh

use aroundu_db
db.events.find()
```

## Troubleshooting

### Stop and Rebuild Containers After Dependency Changes

```bash
docker compose down -v
docker compose up -d --build
```

## Commit Message Guidelines

We're using **commitlint** with **husky** to enforce **Conventional Commits** format.

Commit messages should follow this structure:

```
<type>(optional scope): <description>
```

Examples:

```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(ui): correct button alignment"
```

Allowed types: `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `chore`, `revert`, `translation`, `security`, `changeset`.
