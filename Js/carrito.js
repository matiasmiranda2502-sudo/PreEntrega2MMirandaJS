// Obtiene el contenedor donde se van a mostrar los productos del carrito
let contenedorCarrito = document.getElementById("contenedor-carrito");

// Obtiene los botones de accion
let botonVaciar = document.getElementById("boton-vaciar");
let selectCuotas = document.getElementById("select-cuotas"); 
let detalleCuotas = document.getElementById("detalle-cuotas"); 
let botonConfirmar = document.getElementById("boton-confirmar");

// Recupera el carrito desde localStorage (si no existe, inicializa como array vacio)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos donde se muestran el contador de items y el total del carrito
let contadorItems = document.getElementById("contador-items");
let totalCarrito = document.getElementById("total-carrito");

console.log("Carrito al cargar:", carrito);

// Funcion que renderiza muestra el carrito en pantalla
function mostrarCarrito(lista) {
  contenedorCarrito.innerHTML = "";

  if (lista.length === 0) {
    contenedorCarrito.innerHTML = "<p>Sin productos seleccionados.</p>";

    detalleCuotas.innerHTML = "<p>El carrito esta vacio.</p>";
    botonConfirmar.style.display = "none";
    selectCuotas.value = "";
    mostrarDetalleProductos();
    return;
  }

  lista.forEach(producto => {
    const subtotal = producto.precio * (producto.cantidad || 1);

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-carrito");
    tarjeta.innerHTML = `
      <img src="../Imagenes/${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <h3>${producto.nombre}</h3>
      <p>Marca: ${producto.marca}</p>
      <p>Color: ${producto.color}</p>
      <p>Precio unitario: $${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad || 1}</p>
      <p>Subtotal: $${subtotal}</p>
      <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
      <button class="boton-agregar-carrito" data-id="${producto.id}">Agregar</button>
    `;
    contenedorCarrito.appendChild(tarjeta);
  });

  activarEliminar();
  activarAgregarEnCarrito();
  mostrarDetalleProductos();
  cargarOpcionesCuotas(); 
}

// Funcion que activa los eventos de los botones "Eliminar"
function activarEliminar() {
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");

  botonesEliminar.forEach(btn => {
    btn.onclick = (e) => {
      const id = Number(e.currentTarget.dataset.id);

      const productoEnCarrito = carrito.find(item => item.id === id);
      if (!productoEnCarrito) return;

      // Recuperar productos y stock inicial
      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      let stockInicial = JSON.parse(localStorage.getItem("stockInicial")) || [];

      const productoOriginal = productos.find(p => p.id === id);
      const productoMax = stockInicial.find(p => p.id === id);

      if (productoOriginal && productoMax) {
        if (productoOriginal.unidades < productoMax.unidades) {
          productoOriginal.unidades += 1;
          console.log(`Stock restaurado para ${productoOriginal.nombre}: +1 unidad`);
        } else {
          console.log(`Stock de ${productoOriginal.nombre} ya está en el máximo (${productoMax.unidades})`);
        }
      }

      localStorage.setItem("productos", JSON.stringify(productos));

      // Reducir cantidad en carrito o eliminar producto
      carrito = carrito.map(item => {
        if (item.id === id) {
          if (item.cantidad > 1) {
            return { ...item, cantidad: item.cantidad - 1 };
          } else {
            return null; // eliminar producto
          }
        }
        return item;
      }).filter(item => item !== null);

      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito(carrito);
    };
  });
}

function activarAgregarEnCarrito() {
  const botonesAgregar = document.querySelectorAll(".boton-agregar-carrito");

  botonesAgregar.forEach(btn => {
    btn.onclick = (e) => {
      const id = Number(e.currentTarget.dataset.id);

      // Recuperar productos desde localStorage
      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      const productoOriginal = productos.find(p => p.id === id);

      if (!productoOriginal) return;

      // Validar stock disponible
      if (productoOriginal.unidades <= 0) {
        alert("No quedan unidades disponibles de " + productoOriginal.nombre);
        return;
      }

      // Sumar una unidad al carrito
      carrito = carrito.map(item => {
        if (item.id === id) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });

      // Descontar stock
      productoOriginal.unidades -= 1;

      // Guardar cambios
      localStorage.setItem("productos", JSON.stringify(productos));
      localStorage.setItem("carrito", JSON.stringify(carrito));

      console.log(`Agregado 1 unidad de ${productoOriginal.nombre} desde el carrito`);

      // Volver a renderizar
      mostrarCarrito(carrito);
    };
  });
}

// Evento para vaciar el carrito
botonVaciar.onclick = () => {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  carrito.forEach(item => {
    const productoOriginal = productos.find(p => p.id === item.id);
    if (productoOriginal) {
      productoOriginal.unidades += item.cantidad;
    }
  });
  localStorage.setItem("productos", JSON.stringify(productos));

  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));

  detalleCuotas.textContent = "";

  mostrarCarrito(carrito);
};

botonConfirmar.onclick = () => {
  // Mostrar mensaje en pantalla
  detalleCuotas.innerHTML = `<p style="color: green; font-weight: bold; font-size: 18px;">
    Gracias por su compra!!!
  </p>`;

  //ocultar boton despues de confirmar
  botonConfirmar.style.display = "none";
  selectCuotas.value = "";
};


//Funcion para cargar opciones de cuotas (1 a 12)
function cargarOpcionesCuotas() {
  selectCuotas.innerHTML = "<option value=''>Selecciona cuotas</option>";
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} cuota${i > 1 ? "s" : ""}`;
    selectCuotas.appendChild(option);
  }
}

function mostrarDetalleProductos() {
  if (carrito.length === 0) {
    detalleCuotas.innerHTML = "El carrito esta vacio.";
    return;
  }

  let detalleHTML = "";
  carrito.forEach(item => {
    const subtotal = item.precio * (item.cantidad || 1);
    detalleHTML += `<p>${item.cantidad} ${item.nombre} - Subtotal: $${subtotal}</p>`;
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * (p.cantidad || 1), 0);
  detalleHTML += `<p><strong>Total: $${total}</strong></p>`;

  detalleCuotas.innerHTML = detalleHTML;
}


//Evento para calcular cuotas al seleccionar
selectCuotas.onchange = () => {
  if (carrito.length === 0) {
    //limpiar completamente el detalle y controles
    detalleCuotas.innerHTML = "<p>El carrito esta vacio.</p>";
    botonConfirmar.style.display = "none";
    selectCuotas.value = "";
    return;
  }

  const cuotas = parseInt(selectCuotas.value, 10);

  //mostrar detalle actualizado antes de calcular cuotas
  mostrarDetalleProductos();

  if (!cuotas) {
    botonConfirmar.style.display = "none";
    return;
  }

  const total = carrito.reduce((acc, p) => acc + p.precio * (p.cantidad || 1), 0);
  const valorCuota = (total / cuotas).toFixed(2);

  //agregar linea de cuotas al final del detalle
  detalleCuotas.innerHTML += `<p><strong>${cuotas} cuotas de $${valorCuota}</strong></p>`;
  botonConfirmar.style.display = "inline-block";
};


// Render inicial
mostrarCarrito(carrito);
