# AroundU

## Overview

AroundU is an app that allows users to browse upcoming and ongoing local events. It shows the time, date, and distance of events relative to the user. The app is designed to help users find activities and connect with others in their community.

## Setup Instructions for Developers

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

### 4. Stop and Remove Containers

```bash
docker compose down -v
```

### 5. Rebuild Containers After Dependency Changes

```bash
docker compose down -v
docker compose up -d --build
```

## Commit Message Guidelines

We follow **Conventional Commits** and use **commitlint** with **husky** to enforce this format.

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
