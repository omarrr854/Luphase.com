// ==========================================
// 1. BASE DE DATOS DE PRODUCTOS (INVENTARIO)
// ==========================================
// Se define cada producto con sus imágenes correspondientes para cada color.
const productos = [
  {
    id: 1,
    nombre: 'Playera Negra <<One More Rep>>',
    precio: '$210 MXN',
    descripcion: 'Playera negra de algodón, diseño estampado (One more rep) cómoda para el gimnasio o cualquier ocasión.',
    variantes: [
      { color: 'Negro', imagen: 'OneMoreRepIa.png' },
      { color: 'Beige', imagen: 'OneMoreRepBeige.png' } 
    ]
  },
  {
    id: 2,
    nombre: 'Playera Negra <<Wormhole>>',
    precio: '$249 MXN',
    descripcion: 'Playera negra de algodón de buena calidad, diseño estampado (Wormhole), fresca y cómoda para cualquier ocasión.',
    variantes: [
      { color: 'Negro', imagen: 'TWormhole.png' },
      { color: 'Beige', imagen: 'TWormholeBeige.png' } 
    ]
  },
  {
    id: 3,
    nombre: 'Playera Beige <<White Hole>>',
    precio: '$249 MXN',
    descripcion: 'Playera beige de algodón de alta calidad, diseño exclusivo (White Hole), ideal para un estilo limpio y moderno.',
    variantes: [
      { color: 'Beige', imagen: 'WhiteHole.png' },
      { color: 'Negro', imagen: 'WhiteHoleNegro.png' } 
    ]
  },
  {
    id: 4,
    nombre: 'Playera Negra sin mangas',
    precio: '$199 MXN',
    descripcion: 'Playera negra sin mangas tipo oversized de algodón suave y acabado desgastado, excelente para este verano.',
    variantes: [
      { color: 'Negro', imagen: 'PlayeraSinMangas.png' }
    ]
  }
];

// Variable global para rastrear qué producto tiene abierto el usuario en el modal
let productoActual = null;


// ==========================================
// 2. LÓGICA DEL MODAL (FUNCIONES)
// ==========================================

// Función que se ejecuta al hacer clic en una tarjeta de producto del HTML
function abrirModal(idProducto) {
  // Busca el producto específico por su ID
  productoActual = productos.find(p => p.id === idProducto);

  if (!productoActual) {
    console.error("Producto no encontrado en la base de datos de JS.");
    return;
  }

  // Capturamos los elementos del DOM (HTML)
  const modalImg = document.getElementById('modal-img');
  const modalNombre = document.getElementById('modal-nombre');
  const modalPrecio = document.getElementById('modal-precio');
  const modalDescripcion = document.getElementById('modal-descripcion');
  const selectColor = document.getElementById('Color');

  // Se muestra la información del producto seleccionado en el modal
  modalNombre.innerText = productoActual.nombre;
  modalPrecio.innerText = productoActual.precio;
  modalDescripcion.innerText = productoActual.descripcion;

  // Ponemos la imagen de la primera variante por defecto al abrir
  if (productoActual.variantes.length > 0) {
    modalImg.src = productoActual.variantes[0].imagen;
  }

  // Se limpian opciones antiguas
  selectColor.innerHTML = "";

  // Llenamos el menú desplegable con los colores de CADA producto
  productoActual.variantes.forEach(function(variante) {
    let opcion = document.createElement('option');
    opcion.value = variante.color;   
    opcion.innerText = variante.color; 
    selectColor.appendChild(opcion);
  });


  document.getElementById('modal').style.display = 'flex';
}

// Cerrar el modal
function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
  productoActual = null; // Reseteamos el producto actual por seguridad
}


// ==========================================
// 3. ESCUCHADORES DE EVENTOS (LISTENERS)
// ==========================================

// Detecta cuándo el usuario cambia la opción del color
document.getElementById('Color').addEventListener('change', function() {
  const colorSeleccionado = this.value; 
  const modalImg = document.getElementById('modal-img');

  if (productoActual) {
    // Busca la variante que coincida con el color que el usuario acaba de elegir
    const varianteSeleccionada = productoActual.variantes.find(v => v.color === colorSeleccionado);

    // Si existe esa variante, se cambia la imagen del modal
    if (varianteSeleccionada) {
      modalImg.src = varianteSeleccionada.imagen;
    }
  }
});

// Cierra el modal (si el usuario hace clic afuera del recuadro)
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    cerrarModal();
  }
}
