require("dotenv").config();
const https = require("https");
const fs = require("fs");
const Server = require("./core/api.js");

const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

async function startServer() {
  try {
    https.createServer(options, Server).listen(3000, () => {
      console.info("server is running on port 3000");
    });
  } catch (error) {
    console.error("Error Starting Server", error);
  }
}

startServer();
