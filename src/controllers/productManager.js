import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((prod) => prod.id === id);
  }

  async getProductByCode(code) {
    const products = await this.getProducts();
    return products.find((prod) => prod.code === code);
  }

  async autoId() {
    const products = await this.getProducts();
    const counter = products.length;
    if (counter === 0) {
      return 1;
    } else {
      return products[counter - 1].id + 1;
    }
  }

  async addProduct(title, price, category, code, description, status, stock) {
    const id = await this.autoId();
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const producto = products.find((prod) => prod.code === code);

    if (!producto) {
      products.push({
        title,
        price,
        category,
        id,
        code,
        description,
        status,
        stock,
      });
      await fs.writeFile(this.path, JSON.stringify(products));
    }
  }

  async updateProduct(
    id,
    title,
    price,
    category,
    code,
    description,
    status,
    stock
  ) {
    const products = await this.getProducts();
    const newProducts = products.map((prod) => {
      if (prod.id === id) {
        const udProduct = {
          ...prod,
          title,
          price,
          category,
          code,
          description,
          status,
          stock,
        };
        return udProduct;
      } else {
        return prod;
      }
    });
    await fs.writeFile(this.path, JSON.stringify(newProducts));
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((prod) => prod.id !== id);
    await fs.writeFile(this.path, JSON.stringify(newProducts));
  }
}
export default ProductManager;
