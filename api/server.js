const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8085",  
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],         
    credentials: true                 
  }});
const port = process.env.PORT_API;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8085"); // Permite requisições do localhost:8085
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use("/images", express.static("data/images"));

const routes = require("./routes/routes");
app.use("/", routes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for bid updates from the client
  socket.on("new_bid", (data) => {
    console.log("New bid received:", data);

    // Broadcast the new bid to all connected clients
    io.emit("update_bid", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, function () {
  console.log("Server listening on port " + port);
});
