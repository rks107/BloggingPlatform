const fs = require("fs");
const rfs = require("rotating-file-stream");

const path = require("path");

const logDirectory = path.join(__dirname, "../prodction_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "SomethingSecreteKey",
  host: "127.0.0.1",
  user: "root",
  password: "Rohit@107",
  database: "bloggingplatform",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.BLOG_ASSET_PATH,
  session_cookie_key: process.env.BLOG_SESSION_COOKIE_KEY,
  host: process.env.BLOG_HOST,
  user: process.env.BLOG_USER,
  password: process.env.BLOG_PASSWORD,
  database: process.env.BLOG_DB,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.BLOG_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.BLOG_ENVIRONMENT);
