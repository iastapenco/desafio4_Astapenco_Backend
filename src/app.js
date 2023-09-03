import express from "express";
import multer from "multer";
import prodsRouter from "./routes/products.routes.js";
import viewRouter from "./routes/view.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import ProductManager from "./controllers/productManager.js";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import path from "path";

const PORT = 8080;
const app = express();

const prodsManager = new ProductManager();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
const upload = multer({ storage: storage });
app.use("/static", express.static(path.join(__dirname, "/public")));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Servidor Socket.io del cliente conectado con id: ${socket.id}`);

  socket.on("nuevoProducto", async (data) => {
    const updatedProduct = await prodsManager.addProduct(data);
    socket.emit("productoUpdated", updatedProduct);
    console.log(updatedProduct);
  });
});

app.use("/api/products", prodsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewRouter);

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("Imagen cargada");
});
