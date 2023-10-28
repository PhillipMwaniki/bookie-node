#! /usr/bin/env node

const { execSync } = require('child_process');
const yargs = require('yargs');

// parse the cmd line args

const {
    _: [name],
    path,

} = yargs.argv;

const migrationPath = `src/database/migrations/${name}`;

// run typeorm migration command
execSync(`typeorm migration:create ${migrationPath}`, { stdio: "inherit" });
