import fs from "fs";
import path from "path";

export const createDirectory = (folderPath) => {
  const subfolders = folderPath.split("/");

  let currentFolderPath = "";

  for (const subfolder of subfolders) {
    currentFolderPath = path.join(currentFolderPath, subfolder);

    if (!fs.existsSync(currentFolderPath)) {
      fs.mkdirSync(currentFolderPath);
    }
  }
};
