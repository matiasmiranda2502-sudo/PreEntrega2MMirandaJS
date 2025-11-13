PreEntrega 2 - Matías Miranda JS

Este proyecto corresponde a la segunda pre-entrega del curso de JavaScript.  
Se desarrollo un sistema de carrito de compras con productos renderizados, gestion de stock y almacenamiento en localStorage.

---

Estructura del proyecto

Proyecto/ 
├── index.html 
├── pages/ 
│   └── carrito.html 
├── Imagenes/ 
│   ├── camiseta-nike-roja.jpg 
│   ├── campera-puma-negro.jpg 
│   ├── gorra-reebok-verde.jpg 
│   ├── pantalon-levis-azul.jpg 
│   └── zapatillas-adidas-blanco.jpg 
├── Estilos/ 
│   └── styles.css 
└── JS/ 
    ├── main.js 
    └── carrito.js



---

Puntos de la consigna cumplidos

- Renderizado dinámico de productos**  
  Los productos se muestran en tarjetas generadas con JavaScript, incluyendo nombre, marca, color, precio, stock y imagen.

- Carrito de compras
  - Se pueden agregar productos desde el catalogo.  
  - Se muestran en carrito.html con cantidad, subtotal y botones para agregar/eliminar.  
  - Se puede vaciar el carrito completo.  
  - Se descuenta stock al agregar productos.  
  - Se actualiza stock en tiempo real en el catálogo.

- LocalStorage  
  - Se guarda el stock inicial.  
  - Se persiste el estado del carrito y los productos.  
  - Al recargar la pagina, se mantiene la informacion.

- Cuotas y confirmacion de compra
  - Se puede seleccionar cuotas.  
  - Se muestra detalle de cuotas y boton de confirmacion.

- Imagenes de productos 
  Cada producto tiene su imagen correspondiente en la carpeta Imagenes, renderizada en el catalogo y en el carrito.

- Footer fijo  
  Se agrego un footer con el texto:  
  PreEntrega 2 Matias Miranda JS  
  El footer se mantiene visible al hacer scroll y no tapa el contenido gracias al padding-bottom.

- Estilos CSS
  - Tarjetas con diseño uniforme.  
  - Imagenes con tamaño fijo  
  - Footer estilizado y fijo.  

---

Como probar

1. Abrir index.html para ver el catalogo de productos.  
2. Agregar productos al carrito.  
3. Ir a pages/carrito.html para ver el detalle del carrito.  
4. Probar las funciones de agregar, eliminar, vaciar y cuotas.  
5. Verificar que el estado se mantiene al recargar gracias a localStorage.

---

Estudiante

Matias Miranda
PreEntrega 2 - Curso de JavaScript
