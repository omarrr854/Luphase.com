// 1. INVENTARIO

const productos = [
  {
    id: 1,
     nombre: 'Playera "One More Rep"',
    precio: 210, 
     descripcion: 'Playera de algodón, diseño estampado (One more rep) cómoda para el gimnasio o cualquier ocasión.',
    variantes: [
      { color: 'Negro', imagen: 'OneMoreRepIa.png' },

      { color: 'Beige', imagen: 'OneMoreRepBeige.png' } 
    ]
  },
  {
    id: 2,
     nombre: 'Playera "Wormhole"',
    precio: 249,
     descripcion: 'Playera de algodón de buena calidad, diseño estampado (Wormhole), fresca y cómoda para cualquier ocasión.-----------------> En el estampado dice: "Los puentes de Einstein-Rosen, son soluciones teóricas de las ecuaciones de la relatividad general. Funcionan como un atajo o "túnel" que conecta dos puntos distantes del espacio-tiempo." ',
    variantes: [
      { color: 'Negro', imagen: 'TWormhole.png' },

      { color: 'Beige', imagen: 'TWormholeBeige.png' } 
    ]
  },
  {
    id: 3,
     nombre: 'Playera "White Hole"',
    precio: 249,
     descripcion: 'Playera de algodón de alta calidad, diseño exclusivo (White Hole), ideal para un estilo limpio y moderno. ----------------->Las letras del diseño dicen: "Los agujeros blancos son soluciones teóricas de la relatividad general que funcionan como el reverso del tiempo de un agujero negro. Son objetos hipotéticos que expulsan materia y luz violentamente, pero nada puede entrar en ellos.  "',
    variantes: [
      { color: 'Beige', imagen: 'WhiteHole.png' },

      { color: 'Negro', imagen: 'WhiteHoleNegro.png' } 
    ]
  },
  {
    id: 4,
     nombre: 'Playera sin mangas LUPHASE',
    precio: 199,
     descripcion: 'Playera sin mangas tipo oversized de algodón suave y acabado desgastado, excelente para este verano.',
    variantes: [
      { color: 'Negro', imagen: 'PlayeraSinMangas.png' }
    ]
  },
  {
    id: 5,
     nombre: 'Playera estampada "Quantum entanglement"',
    precio: 216,
     descripcion: 'Playera color negra de algodón suave, con un diseño especial (Quantum entanglement), exelente para los amantes de la cuántica. --------------------> El diseño dice: <<Einstein lo llamó "acción fantasmal a distancia". Dos partículas quedan conectadas de tal manera que lo que le pasa a una afecta instantáneamente a la otra, sin importar si están a centímetros o a años luz de distancia.>>',
    variantes: [
      { color: 'Negro', imagen: 'QuantumEntanglement.png' }
    ]
  },
  {
  id: 6,
     nombre: 'Playera estampada "Endless summer"',
    precio: 199,
     descripcion: 'Playera con diseño en la parte trasera tipo playa, un gran diseño para el verano o para lucir por la calle un dia casual. En la parte de enfrente debajo del cuello la frase "Endless summer" que significa: "Un verano sin fin".',
    variantes: [
      { color: 'Rojo', imagen: 'EndlessSummer.png' },
      { color: 'Verde Oscuro', imagen: 'EndlessSummerVerde.png' },
      { color: 'Negro', imagen: 'EndlessSummerNegro.png' },
      { color: 'Azul Fuerte', imagen: 'EndlessSummerAzul.png' }
    ]
  }
];

let productoActual = null;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


// 2. MODAL PRODUCTOS

function abrirModal(idProducto) {
  productoActual = productos.find(p => p.id === idProducto);

  if (!productoActual) return;

  const modalImg = document.getElementById('modal-img');
  
  const modalNombre = document.getElementById('modal-nombre');
  
  const modalPrecio = document.getElementById('modal-precio');
  
  const modalDescripcion = document.getElementById('modal-descripcion');
  
  const selectColor = document.getElementById('Color');

  
  modalNombre.innerText = productoActual.nombre;
  
  modalPrecio.innerText = `$${productoActual.precio} MXN`;
  
  modalDescripcion.innerText = productoActual.descripcion;

  if (productoActual.variantes.length > 0) {
    modalImg.src = productoActual.variantes[0].imagen;
  }

  selectColor.innerHTML = "";
  productoActual.variantes.forEach(function(variante) {
     let opcion = document.createElement('option');
   opcion.value = variante.color;   
     opcion.innerText = variante.color; 
    selectColor.appendChild(opcion);
  });

  document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
  
  document.getElementById('modal').style.display = 'none';
  
  productoActual = null;
}

// actualiza la imagen 
document.getElementById('Color').addEventListener('change', function() {
  const colorSeleccionado = this.value; 
  
  const modalImg = document.getElementById('modal-img');

  if (productoActual) {
    const varianteSeleccionada = productoActual.variantes.find(v => v.color === colorSeleccionado);
    if (varianteSeleccionada) {
      modalImg.src = varianteSeleccionada.imagen;
    }
  }
});



// 3.CARRITO

function toggleCarrito(e) {
     if(e) e.preventDefault();
  document.getElementById('carrito-modal').style.display = 'flex';
}

function cerrarCarrito() {
  document.getElementById('carrito-modal').style.display = 'none';
  reiniciarEleccion();
}

function reiniciarEleccion() {
  eligiendoProductos = false;
  button.innerText = "Elegir que comprar";

  const checkboxes = document.querySelectorAll('#lista-carrito input[type="checkbox"]');
  checkboxes.forEach(input => {
    input.style.display = 'none';
    input.checked = false; 
  });
}

function agregarAlCarrito() {
  if (!productoActual) return;

  const colorElegido = document.getElementById('Color').value;
   const tallaElegida = document.getElementById('tamaño').value;
    const codigoUnico = `${productoActual.id}-${colorElegido}-${tallaElegida}`;
 

  const existe = carrito.some(item => item.codigo === codigoUnico);


  if (existe) {
    carrito = carrito.map(item => {
      if (item.codigo === codigoUnico) item.cantidad++;
      return item;
    });
  } else {
    const nuevoItem = {
      codigo: codigoUnico,
      
      id: productoActual.id,
      
      nombre: productoActual.nombre,
      
      precio: productoActual.precio,
      
      color: colorElegido,
      
      talla: tallaElegida,
      
      cantidad: 1
    };
    carrito.push(nuevoItem);
  }

  actualizarCarritoHTML();
  cerrarModal();
            document.getElementById('carrito-modal').style.display = 'flex';
}

function actualizarCarritoHTML() {
  const lista = document.getElementById('lista-carrito');
  
  const totalContenedor = document.getElementById('total-carrito');
  
  const contador = document.getElementById('contador-cart');
  

  lista.innerHTML = '';
    let total = 0;
       let totalArticulos = 0;


  carrito.forEach(item => {
     total += item.precio * item.cantidad;
       totalArticulos += item.cantidad;

    const li = document.createElement('li');
    li.className = 'item-carrito';
    

    li.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br>
         <small>Talla: ${item.talla} | Color: ${item.color}</small><br>
          <span>$${item.precio} x ${item.cantidad}</span>
      </div>
      <div class="item-actions">
      <label>
        <input type= "checkbox"/>
      </label>
         <span></span>
        <button onclick="cambiarCantidad('${item.codigo}', -1)">-</button>
          <button onclick="cambiarCantidad('${item.codigo}', 1)">+</button>
           <button class="eliminar" onclick="eliminarDelCarrito('${item.codigo}')">&times;</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalContenedor.innerText = `$${total} MXN`;
  contador.innerText = totalArticulos;

  if (eligiendoProductos) {
    mostrarCheckboxesCarrito();
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cambiarCantidad(codigo, cambio) {
  carrito = carrito.map(item => {
    if (item.codigo === codigo) {
      item.amount = item.cantidad += cambio;
    }
    return item;
  }).filter(item => item.amount = item.cantidad > 0);

                   actualizarCarritoHTML();
}

function eliminarDelCarrito(codigo) {
 carrito = carrito.filter(item => item.codigo !== codigo);
                 actualizarCarritoHTML();
}

function vaciarCarrito() {
  carrito = [];
                    actualizarCarritoHTML();
}

let eligiendoProductos = false; //"Elegir"

const button = document.getElementById('Elegir');
button.addEventListener("click", doSomething);

function doSomething() {
  if (eligiendoProductos) {
    // Segundo click: Shopify
    return;
  }

  // Primer click
  eligiendoProductos = true;
  mostrarCheckboxesCarrito();
  button.innerText = "Comprar lo elegido";
}

function mostrarCheckboxesCarrito() {
  const checkboxes = document.querySelectorAll('#lista-carrito input[type="checkbox"]');
  checkboxes.forEach(input => {
    input.style.display = 'inline-block';
  });
}

document.addEventListener('DOMContentLoaded', () => {
                     actualizarCarritoHTML();
});



window.onclick = function(event) {
  const modalProducto = document.getElementById('modal');
  
  const modalCarrito = document.getElementById('carrito-modal');
  

  if (event.target == modalProducto) {
             cerrarModal();
  }
  if (event.target == modalCarrito) {
            cerrarCarrito();
  }
}