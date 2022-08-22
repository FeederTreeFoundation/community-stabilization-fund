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

- Latest version of Node.js and NPM
- [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Running Locally

1. Run `cd community-stabilization-fund-api` 
2. Run `nvm install` (Optional if you're on node v18+)
3. Run `npm install`
4. Run `npm run dev`

## Setting Up Database

*** in another shell/terminal ***
1. (Optional) Update or add env variables for `db/config.js`
2. Run `cd community-stabilization-fund-api`
3. Run `npm install`
4. Run `npm run seed`

## Environments

|   Env       | Domain                  |
| ----------- | ----------------------  |
| Local       | https://localhost:3000  |
| QA          | https://feedertreelabs.github.io/community-stabilization-fund |
| Prod        | https://community-stabilization-fund.vercel.app |

## Project Architecture

This section is under construction.

## Contributing

See [Contribution guide](Contribution.md)