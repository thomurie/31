const fs = require("fs");
const process = require("process");
const axios = require("axios");

function errorMsg(msg) {
  console.log(msg);
  process.exit(4);
}

function cat(path) {
  fs.readFile(`./${path}`, "utf8", (err, data) => {
    if (err) {
      errorMsg(err);
    }
    console.log(data);
  });
}

async function webCat(path) {
  if (path.indexOf("http") !== -1) {
    try {
      const res = await axios.get(path);
      console.log(String(res.data));
      return String(res.data);
    } catch (error) {
      errorMsg(error);
    }
  } else {
    cat(path);
  }
}

async function write(path) {
  try {
    if (process.argv[2] === "--out") {
      fs.writeFile(
        `./${process.argv[3]}`,
        String(await webCat(process.argv[4])),
        { encoding: "utf8", flag: "w" },
        (err) => {
          errorMsg(err);
        }
      );
    } else {
      webCat(path);
    }
  } catch (error) {
    errorMsg(err);
  }
}

write(process.argv[2]);
