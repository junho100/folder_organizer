const fs = require("fs");
const path = require("path");
const PARENTROOT = "./Pictures";
const TARGETROOT = path.join(PARENTROOT, process.argv[2]);

if (!fs.existsSync(path.join(TARGETROOT, "video"))) {
  fs.mkdir(path.join(TARGETROOT, "video"), (err) => {
    if (err) {
      console.log(err);
    }
  });
}
if (!fs.existsSync(path.join(TARGETROOT, "captured"))) {
  fs.mkdir(path.join(TARGETROOT, "captured"), (err) => {
    if (err) {
      console.log(err);
    }
  });
}
if (!fs.existsSync(path.join(TARGETROOT, "duplicated"))) {
  fs.mkdir(path.join(TARGETROOT, "duplicated"), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

const moveFile = (fileName) => {
  if (path.extname(fileName) === ".mp4" || path.extname(fileName) === ".mov") {
    const targetPath = path.join(TARGETROOT, "video");
    fs.promises
      .rename(path.join(TARGETROOT, fileName), path.join(targetPath, fileName))
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  if (path.extname(fileName) === ".png" || path.extname(fileName) === ".aae") {
    const targetPath = path.join(TARGETROOT, "captured");
    fs.promises
      .rename(path.join(TARGETROOT, fileName), path.join(targetPath, fileName))
      .catch((err) => {
        console.log(err);
      });
    return;
  }
  if (path.extname(fileName) === ".jpg") {
    if (!isNaN(fileName[4])) {
      const targetPath = path.join(TARGETROOT, "duplicated");
      fs.promises
        .rename(
          path.join(TARGETROOT, fileName),
          path.join(targetPath, fileName)
        )
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  }
};

fs.readdir(TARGETROOT, (err, fileList) => {
  for (let i = 0; i < fileList.length; i++) {
    moveFile(fileList[i]);
  }
});
