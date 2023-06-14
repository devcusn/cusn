#!/usr/bin/env node
import fs from "fs";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hideBinArgv = hideBin(process.argv);
//init project
yargs(hideBinArgv)
  .command(
    "init",
    "Initialize cusn.config.json file",
    () => {},
    (argv) => {
      const data = {
        type: "simple",
      };

      const jsonData = JSON.stringify(data, null, 2);

      // Write the JSON data to cusn.json file
      fs.writeFileSync("cusn.config.json", jsonData);

      console.log("cusn.json file created!");
    }
  )
  .demandCommand(1, "You need to specify a command.")
  .help();

//add page
yargs(hideBinArgv)
  .command(
    "add",
    "add page",
    () => {},
    (argv) => {
      fs.writeFileSync("HomePage.tsx", "");
      console.log("HomePage.tsx created");
    }
  )
  .demandCommand(1, "You need to specify a command.")
  .help().argv;
