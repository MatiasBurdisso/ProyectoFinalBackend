import config from "../config/config.js";
import mongoose from "mongoose";
import DatabaseManagerMongo from "./mongo/Class/DatabaseManager.js";
import DatabaseManagerMemory from "./memory/Class/DatabaseManager.js";

let DATA;
switch (config) {
  case "MONGO":
    console.log("iniciara con  mongo");

    DATA = {
      CartManager: DatabaseManagerMongo.CartManager,
      ProductManager: DatabaseManagerMongo.ProductManager,
    };

    break;
  case "MEMORY":
    console.log("iniciara con  memoria");
    DATA = {
      CartManager: DatabaseManagerMemory.CartManager,
      ProductManager: DatabaseManagerMemory.ProductManager,
    };
}

export default DATA;