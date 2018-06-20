const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const DEST = path.join("ext", "google.js");

async function sync() {
  console.log("Fetching latest Google JavaScript API...");
  const res = await fetch("https://apis.google.com/js/platform.js");
  const content = await res.text();
  fs.writeFileSync(DEST, ["/* eslint-disable */", content].join("\n"), {
    encoding: "utf-8"
  });
  console.log(`Saved latest Google JavaScript API at ${DEST}`);
}

sync();
