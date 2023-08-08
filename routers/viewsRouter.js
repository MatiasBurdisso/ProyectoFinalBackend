import express from 'express';
const viewsRouter = express.Router();
import fs from 'fs';
import { getProducts, realTimeProducts } from '../Controllers/viewsRouterController.js';

const readFile= async () => {

    const data = await fs.readFileSync("./database/productos.json", "utf-8");
    
    const products = await JSON.parse(data);
    
    return products;
    
    };

/*viewsRouter.get ("/", async (req, res) => { 
    const products = await readFile(); 
    res.render("home", {products} );
});*/

viewsRouter.get('/realtimeproducts', realTimeProducts)

viewsRouter.get('/', getProducts)


export default viewsRouter;