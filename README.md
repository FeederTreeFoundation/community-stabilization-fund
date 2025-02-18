# Community Stabilization Fund

API Interface for Community Stabilization Fund

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Running Locally](#running-locally)
3. [Setting Up Database](#setting-up-database)
4. [Environments](#environments)
5. [Project Architecture](#project-architecture)
6. [Contributing](#contributing)

## Prerequisites

- Version 18.7.0 of Node.js and 8.15.0 of NPM
- [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

## Running Locally

1. Run `cd community-stabilization-fund-api`
2. Run `nvm install` (Optional if you're on node v18+)
3. Run `npm install --legacy-peer-deps`
4. Run `npm run dev`

### Setting Up Auth0

1. Setup your `.env.local` file

```
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://feedertreelabs-dev.us.auth0.com'
AUTH0_CLIENT_ID='your client id'
AUTH0_CLIENT_SECRET='your client secret'
```

***READ MORE:*** [Auth0](https://auth0.com/docs/get-started)

### Setting Up Database

**_ in another shell/terminal _**

1. Setup your `.env` file

```
export DATABASE_URL="mysql://root:password@127.0.0.1:3306/csf_db"
export NEXT_PUBLIC_NODE_ENV="local"
export NEXT_PUBLIC_VERCEL_URL="localhost:3000"
```
2. Start up your `mysql` server
3. Run `npm run migrations:create` to setup database

***READ MORE:*** [Prisma](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/team-development)

### Adding API Resources
- [docs/adding_api_resources.md](docs/adding_api_resources.md)

## Deployments

Deployments will fail if you have linting issues, typing errors or other bugs caught in the code.

To resolve linting issues:
- Run `npm run lint:fix`

To debug all other errors:
- Run `npm run build`

## Additional Tools
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## Troubleshooting

- If you have issues with your environment variables, you can try changing them inside your `.bashrc`, or `.zshrc` file in your root folder or using the CLI to explicitly set them with the `export` command:

_CLI_
```sh
export CSF_USERNAME='root'
export CSF_PASSWORD='password'
```

- If you come across an error that says Client does not support authentication protocol:

https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

- If your database can't connect to localhost because of an ::1 connection error:

Use 127.0.0.1 as your database host

```sh
export CSF_HOSTNAME='127.0.0.1'
```

## Environments

| Env   | Domain                                                        |
| ----- | ------------------------------------------------------------- |
| Local | https://localhost:3000                                        |
| Prod  | https://community-stabilization-fund.vercel.app               |

## Project Architecture

https://docs.google.com/document/d/13B5FnmChy6CaXD8icjhWdJsZ0y81uuwRnhoQ9Ca_iTA/edit?usp=sharing

## Contributing

See [Contribution guide](Contribution.md)
