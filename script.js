function abrirModal(imagen, nombre, precio, descripcion) {
  document.getElementById('modal-img').src = imagen;
  document.getElementById('modal-nombre').innerText = nombre;
  document.getElementById('modal-precio').innerText = precio;
  document.getElementById('modal-descripcion').innerText = descripcion;
  document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    cerrarModal();
  }
}