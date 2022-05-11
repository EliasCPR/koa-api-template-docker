#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

import { Command } from "commander";
import fs from "fs";

const { npm_package_version, npm_package_description } =
  process.env;

const program = new Command();

program
  .name("yarn cli")
  .description(npm_package_description)
  .version(npm_package_version)

fs.readdirSync("./src/commands").forEach((e) =>
  require("./commands/" + e).default(program)
);

program.parse(process.argv);
