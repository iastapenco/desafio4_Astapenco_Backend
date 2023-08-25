import { Router } from "express";
import CartManager from "../cartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post("/", async (req, res) => {
  const newCart = await cartManager.addCart();
  if (newCart) {
    res.status(200).send("Carrito creado");
    return newCart;
  } else {
    res.status(400).send("Error al crear el carrito");
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const cId = parseInt(req.params.cid);
  const products = await cartManager.getCartById(cId);
  if (products) {
    res.status(200).send(products);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const cId = parseInt(req.params.cid);
  const pId = parseInt(req.params.pid);

  const productsInCart = await cartManager.addProductToCart(cId, pId);
  if (productsInCart) {
    res.status(200).send("Producto agregado correctamente");
  } else {
    res.status(400).send("Error al agregar el producto");
  }
});

export default cartsRouter;
