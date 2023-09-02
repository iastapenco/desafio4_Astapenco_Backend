import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const viewRouter = Router();

const prodsManager = new ProductManager();

viewRouter.get("/", async (req, res) => {
  const listaproductos = await prodsManager.getProducts({});
  res.render("home", { listaproductos });
});

viewRouter.get("/realtimeproducts", async (req, res) => {
  const listaproductos = await prodsManager.getProducts({});
  res.render("realTimeProducts", {
    css: "style.css",
    js: "realTimeProducts.js",
    listaproductos,
  });
});

export default viewRouter;
