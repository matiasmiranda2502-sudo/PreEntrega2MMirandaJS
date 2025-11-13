// ARRAY DE OBJETO PARA PRODUCTOS
const productosOriginales  = [
  { id: 1, nombre: "Camiseta", marca: "Nike", precio: 1500, unidades: 10, color: "Rojo", imagen: "camiseta-nike-roja.jpg" },
  { id: 2, nombre: "Zapatillas", marca: "Adidas", precio: 4500, unidades: 5, color: "Blanco", imagen: "zapatillas-adidas-blanco.jpg" },
  { id: 3, nombre: "Pantalon", marca: "Levis", precio: 3000, unidades: 8, color: "Azul", imagen: "pantalon-levis-azul.jpg" },
  { id: 4, nombre: "Campera", marca: "Puma", precio: 6000, unidades: 3, color: "Negro", imagen: "campera-puma-negro.jpg" },
  { id: 5, nombre: "Gorra", marca: "Reebok", precio: 800, unidades: 15, color: "Verde", imagen: "gorra-reebok-verde.jpg" }
];

// LOCAL STORAGE
if (!localStorage.getItem("stockInicial")) {
  localStorage.setItem("stockInicial", JSON.stringify(productosOriginales));
}

//inicializar productos si no existen
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify(productosOriginales));
}

let productos = JSON.parse(localStorage.getItem("productos"));
let contenedorProductos = document.getElementById("contenedor-productos");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// FUNCION PARA RENDERIZAR PRODUCTOS
function mostrarProductos(lista) {
  contenedorProductos.innerHTML = ""; // limpiar antes de renderizar
  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    tarjeta.innerHTML = `
      <img src="Imagenes/${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <h3>${producto.nombre}</h3>
      <p>Marca: ${producto.marca}</p>
      <p>Color: ${producto.color}</p>
      <p>Precio: $${producto.precio}</p>
      <p id="stock-${producto.id}">Unidades disponibles: ${producto.unidades}</p>
      <button class="boton-agregar" id="${producto.id}" ${producto.unidades <= 0 ? "disabled" : ""}>
        ${producto.unidades <= 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    `;

    contenedorProductos.appendChild(tarjeta);
  });
  activarEventos();
}

// FUNCION PARA AGREGAR EVENTOS
function activarEventos() {
  const botonesAgregar = document.querySelectorAll(".boton-agregar");

  botonesAgregar.forEach(boton => {
    boton.onclick = (e) => {
      const idProducto = Number(e.currentTarget.id);

      const productoSeleccionado = productos.find(p => p.id === idProducto);

      // VALIDAR STOCK
      if (productoSeleccionado.unidades <= 0) {
        e.currentTarget.disabled = true;
        e.currentTarget.textContent = "Sin stock";
        return;
      }

      const existente = carrito.find(item => item.id === idProducto);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          marca: productoSeleccionado.marca,
          color: productoSeleccionado.color,
          precio: productoSeleccionado.precio,
          imagen: productoSeleccionado.imagen,
          cantidad: 1
        });
      }

      // Descontar stock
      productoSeleccionado.unidades -= 1;

      // Actualizar texto de stock
      const stockTexto = document.getElementById(`stock-${idProducto}`);
      if (stockTexto) {
        stockTexto.textContent = `Unidades disponibles: ${productoSeleccionado.unidades}`;
      }

      if (productoSeleccionado.unidades <= 0) {
        e.currentTarget.disabled = true;
        e.currentTarget.textContent = "Sin stock";
      }

      // Guardar cambios
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("productos", JSON.stringify(productos));
    };
  });
}

// Render inicial
mostrarProductos(productos);
