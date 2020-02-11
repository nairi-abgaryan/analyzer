# Analyzer

> Project for analyze cars board data
## Getting started

```bash
# 1. Clone the repository or click on "Use this template" button.
git clone 

# 2. Enter your newly-cloned folder.
cd my-new-project

# 3. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn

# 4. Run development server and open http://localhost:3000
yarn start:dev

# 5. Read the documentation linked below for "Setup and development".
```

## Documentation

This project includes a `docs` folder with more details on:
First-time setup
Make sure you have the following installed:

Node (at least the latest LTS)
Yarn (at least 1.0)
#Installation
# Install dependencies from package.json
yarn install
Note: don't delete yarn.lock before installation

#Database
Note: Awesome nest analyzer uses TypeORM with Data Mapper pattern.

#Configuration
Before start in docker compose file run Postgres container.
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=analyzer
```
Some helper script to work with database

```
# To create empty migration file
yarn typeorm:migration:create migration_name

# To generate new migration file depend current db
yarn typeorm:migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
yarn typeorm:schema:drop

# Generate migration from update of entities
yarn migration:generate migration_name

```
#Dev server
Note: If you're on Linux and see an ENOSPC error when running the commands below, you must increase the number of available file watchers.

```
# Launch the dev server
yarn start:dev

# Launch the dev server with file watcher
yarn watch:dev

# Launch the dev server and enable remote debugger with file watcher
yarn debug:dev
#Generators
This project includes generators to speed up common development tasks. Commands include:

Note: Make sure you already have the nest-cli globally installed

# Install nest-cli globally
yarn global add @nestjs/cli

# Generate a new service
nest generate service users

# Generate a new class
nest g class users
```

