const socket = io();

const form = document.getElementById("idForm");
const botonProds = document.getElementById("botonProductos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datForm = new FormData(e.target);
  const prod = Object.fromEntries(datForm);
  socket.emit("nuevoProducto", prod);
  e.target.reset();
});

socket.on("productoUpdated", (prod) => {
  const listaProductos = document.getElementById("listaProductos");
  const divProduct = document.createElement("div");
  divProduct.innerHTML = ` <h2>${prod.title}</h2>
  <h3>Precio:$ ${prod.price} </h3>
  <h3>Categoría: ${prod.category}</h3>
  <div>
    <h3>Descripción:</h3>
    <p>${prod.description}</p>
  </div>
  <h3>Stock: ${prod.stock}</h3>  
  <h3>Código: ${prod.code}</h3>`;
  listaProductos.appendChild(divProduct);
});
