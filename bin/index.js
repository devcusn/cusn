#!/usr/bin/env node
import fs from "fs";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createDirectory } from "../utils/path.js";

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
  .help().argv;

//add page or component
yargs(hideBinArgv)
  .command(
    "add",
    "add page",
    (yargs) => {
      yargs.option("path", {
        describe: "Path for the page/component",
        demandOption: true,
        type: "string",
      });
      yargs.option("component", {
        describe: "Component name",
        type: "string",
      });
      yargs.option("page", {
        describe: "Page name",
        type: "string",
      });
    },
    (argv) => {
      const { path, component, page } = argv;

      if (!path || (!component && !page)) {
        console.error(
          "Error: You must provide a --path and either --component or --page."
        );
        return;
      }
      createDirectory(`${"src"}/${path}/${component || page}`);
      const content = fs.readFileSync("./patterns/Page.pattern", "utf8");

      const pageContent = content.replace(/__PAGE_NAME__/g, page);
      fs.writeFileSync(
        `${"src"}/${path}/${component || page}/${
          component || path
        }.component.tsx`,
        pageContent,
        "utf8"
      );
      fs.writeFileSync(`${"src"}/${path}/${component || page}/types.d.ts`, "");
    }
  )
  .demandCommand(1, "You need to specify a command.")
  .help().argv;
