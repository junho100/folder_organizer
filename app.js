const fs = require("fs");
const path = require("path");
const PARENTROOT = "./Pictures";
const TARGETROOT = path.join(PARENTROOT, process.argv[2]);
let files = [];

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
    const input = fs.createReadStream(path.join(TARGETROOT, fileName));
    const output = fs.createWriteStream(path.join(targetPath, fileName));
    input.pipe(output);
    fs.rm(path.join(TARGETROOT, fileName));
    return;
  }
  if (path.extname(fileName) === ".png" || path.extname(fileName) === ".aae") {
    const targetPath = path.join(TARGETROOT, "captured");
    const input = fs.createReadStream(path.join(TARGETROOT, fileName));
    const output = fs.createWriteStream(path.join(targetPath, fileName));
    input.pipe(output);
    fs.rm(path.join(TARGETROOT, fileName));
    return;
  }
  if (path.extname(fileName) === ".jpg") {
    if (!isNaN(fileName[4])) {
      const targetPath = path.join(TARGETROOT, "duplicated");
      const input = fs.createReadStream(path.join(TARGETROOT, fileName));
      const output = fs.createWriteStream(path.join(targetPath, fileName));
      input.pipe(output);
      fs.rm(path.join(TARGETROOT, fileName));
      return;
    }
  }
};

fs.readdir(TARGETROOT, (err, fileList) => {
  for (let i = 0; i < fileList.length; i++) {
    moveFile(fileList[i]);
  }
});
