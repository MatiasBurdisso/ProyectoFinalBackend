import __dirname from "./utils.js";
import chatRoute from "./routers/chatRouter.js";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import messageRoute from "./routers/messageRouter.js";
import { messageModel } from "./DAO/models/chatModel.js";
import fs from "fs";
import viewsRouter from "./routers/viewsRouter.js";
import productsRouteDB from "./routers/productsRouteDB.js";
import cartsRouteDB from "./routers/cartsRouteDB.js";
import loginRouter from "./routers/loginRoute.js";
import signupRouter from "./routers/signupRoute.js";
import sessionsRouter from "./routers/sessionsRoute.js";
import ticketRouter from "./routers/ticket.model.js";
import currentUser from "./routers/sessionsRoute.js";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
import forgotRoutes from "./routers/forgotRoutes.js";
import passport from "passport";
import initializePassport from "./config/passportConfig.js";
import nodemailer from "nodemailer";

const app = express();
const PORT = 8080;
dotenv.config();

const messages = [];

//Consts Mongo
const USER_MONGO = process.env.USER_MONGO;
const PASS_MONGO = process.env.PASS_MONGO;
const DB_MONGO = process.env.DB_MONGO;

// Configuracion Express.
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/public/views");
app.set("/public/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/socketMessage", (req, res) => {
  const { message } = req.body;
  socketServer.emit("message", message);

  res.send("ok");
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://burdio:7654321@cluster0.pzcooec.mongodb.net/39700?retryWrites=true&w=majority`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
  })
);

//initializePassport();
//app.use(passport.initialize());
//app.use(passport.session());

// Middleware para los datos de sesión.
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const socketServer = new Server(httpServer);

const readJson = async () => {
  const data = await fs.readFileSync("./database/productos.JSON", "utf-8");
  const products = await JSON.parse(data);
  return products;
};

const writeJson = async (data) => {
  const dataToWrite = await JSON.stringify(data, null, "\t");
  await fs.writeFileSync("./database/productos.JSON", dataToWrite);
};

const socketProductos = socketServer.of("/");

socketProductos.on("connection", (socket) => {
  console.log("nuevo user conectado");

  socket.on("message", async (data) => {
    let productos = await readJson();

    productos.push({ title: data });

    await writeJson(productos);

    socketProductos.emit("paragraph", productos); //productos lee el archivo
  });
});

const socketChat = socketServer.of("/chat");

socketChat.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
    socketChat.emit("new-user-connected", {
      user: socket.user,
      id: socket.id,
    });
  });
  socket.on("message", (data) => {
    messages.push(data);
    socketChat.emit("messageLogs", messages);
    messageModel.create(data);
  });
});

const environment = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://burdio:7654321@cluster0.pzcooec.mongodb.net/39700?retryWrites=true&w=majority`
    );
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(`Error al conectar a a la base de datos: ${error}`);
  }
};

const isValidStartDB = () => {
  if (burdio && 7654321) return true;
  else return false;
};

// Rutas.
app.use("/", viewsRouter);
app.use("/chat", chatRoute);
app.use("/messages", messageRoute);
app.use("/products", productsRouteDB);
app.use("/api/carts", cartsRouteDB);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/api/sessions/", sessionsRouter);
app.use("/logout", sessionsRouter);
app.use("/forgot", forgotRoutes);
app.use("/current", currentUser);
app.use("/ticket", ticketRouter);

//inicializar el envio de mail

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "l.katz92@gmail.com",
    pass: " wgtmyxoujarkujym",
  },
});

app.get("/mail", async (req, res) => {
  let result = await transporter.sendMail({
    from: "CoderHouse 37570 <coderhouse37570@gmail.com",
    to: "l.katz92@gmail.com",
    subject: "Prueba de Envio de Correo",
    text: "Este es un mail de prueba",
    html: "<h1>Probando probando 1 2 3 probando</h1>",
  });
  res.send("Correo Enviado");
});

console.log("isValidStartDB", isValidStartDB());
isValidStartDB() && environment();


/*const app = express();
const httpServer = app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: "coderhouse",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: "mongodb+srv://burdio:7654321@cluster0.pzcooec.mongodb.net/39700?retryWrites=true&w=majority",
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 30,
      }),
    })
  );
  
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/views", viewRoutes);

app.set("view engine", "ejs");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    req.send("hola mundo");
    res.send("Hello World!");
  });
  
  app.use("/signup", signupRouter);
  app.use("/login", loginRouter);




const environment = async () => {
    await mongoose
      .connect("mongodb+srv://burdio:7654321@cluster0.pzcooec.mongodb.net/?retryWrites=true&w=majority")
      .then(() => console.log("Conectado a la base de datos"))
      .catch((error) => console.log("Error de conexion", error));
  };
  
  environment();*/
