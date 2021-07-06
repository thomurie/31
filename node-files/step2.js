const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(`./${path}`, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(path) {
  if (path.indexOf("http") !== -1) {
    try {
      const res = await axios.get(path);
      console.log(res);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  } else {
    cat(path);
  }
}

webCat(process.argv[2]);
