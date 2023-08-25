import { Router } from "express";
import ProductManager from "../productManager.js";

const prodsRouter = Router();
const productManager = new ProductManager();

prodsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const { limit } = req.query;
  if (limit) {
    const prods = products.slice(0, limit);
    res.status(200).send(prods);
  } else {
    res.status(200).send(products);
  }
});

prodsRouter.get("/:pid", async (req, res) => {
  const pId = parseInt(req.params.pid);
  const prod = await productManager.getProductById(pId);
  prod
    ? res.status(200).send(prod)
    : res.status(404).send("Producto no existente");
});

prodsRouter.post("/", async (req, res) => {
  const { title, price, category, code, description, status, stock } = req.body;
  const confirm = await productManager.getProductByCode(code);
  if (confirm) {
    res.status(400).send("Producto ya existente");
  } else {
    const add = productManager.addProduct(
      title,
      price,
      category,
      code,
      description,
      status,
      stock
    );
    if (add) {
      res.status(200).send("Producto creado");
    }
  }
});

prodsRouter.put("/:pid", async (req, res) => {
  const pId = parseInt(req.params.pid);
  const { title, price, category, code, description, status, stock } = req.body;
  const prod = await productManager.getProductById(pId);
  if (prod) {
    const update = await productManager.updateProduct(
      pId,
      title,
      price,
      category,
      code,
      description,
      status,
      stock
    );
    res.status(200).send("Producto actualizado");
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

prodsRouter.delete("/:pid", async (req, res) => {
  const pId = parseInt(req.params.pid);
  const product = await productManager.getProductById(pId);
  if (product) {
    await productManager.deleteProduct(pId);
    res.status(200).send("Producto eliminado con éxito");
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

export default prodsRouter;
