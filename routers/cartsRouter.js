import express from 'express';
const routerCarts = express.Router();
import fs from 'fs'; //esto se deberia eliminar, verdad?
import { addAlCart, cartLogic, cartSearch } from '../Controllers/cartsRouterController,js';

const cartDB = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8')) //y esto elimino tambien, verdad?


routerCarts.post("/", cartLogic);


routerCarts.get("/:cid",cartSearch);


routerCarts.post("/:cid/product/:pid",addAlCart)

module.exports =  routerCarts