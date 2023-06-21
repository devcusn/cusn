#!/usr/bin/env node
import fs from "fs";
import { fileURLToPath } from "url";
import path,{ dirname } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createDirectory } from "../utils/path.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const projectDirPath = dirname(currentDirPath)
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
        baseURL: "src"
      };
      createDirectory(`.cusn`);
      createDirectory(`.cusn/patterns`);
      const jsonData = JSON.stringify(data, null, 2);
      const content = fs.readFileSync(path.join(projectDirPath,'patterns','example.pattern.cusn'), "utf8");
      const content2 = fs.readFileSync(path.join(projectDirPath,'patterns','types.pattern.cusn'), "utf8");
      fs.writeFileSync(".cusn/patterns/example.pattern.cusn", content);
      fs.writeFileSync(".cusn/patterns/types.pattern.cusn", content2);
      // Write the JSON data to cusn.json file
      fs.writeFileSync(".cusn/cusn.config.json", jsonData);
      console.log("project init");
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
      yargs.option("pattern", {
        describe: "pattern name",
        type: "string",
      });
      yargs.option("name", {
        describe: "file name",
        type: "string",
      });
    },
    (argv) => {
      const { path, pattern ,name} = argv;

      if (!path || !pattern || !name) {
        console.error(
          "Error: You must provide a --path and pattern."
        );
        return;
      }
      createDirectory(`${"src"}/${path}/${name}`);
      const newPath = `./.cusn/patterns/${pattern}.pattern.cusn`;
      const content = fs.readFileSync(newPath, "utf8");

      const pageContent = content.replace(/__PAGE_NAME__/g, name);
      fs.writeFileSync(
        `${"src"}/${path}/${name}/${name}.component.tsx`,
        pageContent,
        "utf8"
      );
      fs.writeFileSync(`${"src"}/${path}/${name}/types.d.ts`, "");
    }
  )
  .demandCommand(1, "You need to specify a command.")
  .help().argv;
