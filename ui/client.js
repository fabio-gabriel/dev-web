const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8085;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

const routes = require("./routes/routes");
app.use("/", routes);

app.listen(port, function () {
  console.log("Server listening on port " + port);
});
