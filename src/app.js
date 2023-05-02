import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import signupRouter from "./routes/signup.routes.js";
import loginRouter from "./routes/login.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewRoutes from "./routes/views.routes.js";



const app = express();
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
  
  environment();



