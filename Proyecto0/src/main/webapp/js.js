let usuarios = [];
let cochesEnCarrito = [];
const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
	cochesEnCarrito = JSON.parse(carritoGuardado);
}

function registrarUsuario() {
	const nombreUsuario = document.getElementById("nombreUsuario").value;
	const correoElectronico = document.getElementById("correoElectronico").value;
	const contraseña = document.getElementById("contraseñaRegistro").value;

	const nuevoUsuario = {
		username: nombreUsuario,
		email: correoElectronico,
		password: contraseña
	};

	usuarios.push(nuevoUsuario);
	alert("Usuario registrado con éxito");
	document.getElementById("registrarUsuario").reset();

	return false;
}

function iniciarSesion() {
	const nombreUsuarioOEmail = document.getElementById("Usuario").value;
	const contraseña = document.getElementById("contraseña").value;

	const usuario = usuarios.find(u => u.username === nombreUsuarioOEmail || u.email === nombreUsuarioOEmail);

	if (usuario && usuario.password === contraseña) {
		alert("Inicio de sesión exitoso");
		return true;
	} else {
		const mensajeError = document.getElementById('mensajeError');
		mensajeError.textContent = "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
		return false;
	}
}


function manejarFormularioDireccion() {
	const formularioDireccion = document.getElementById('direccionCompleta');

	const nombreApellido = document.getElementById('nombreApellido').value;
	const direccion = document.getElementById('direccion').value;
	const ciudad = document.getElementById('ciudad').value;
	const provincia = document.getElementById('provincia').value;
	const codigoPostal = document.getElementById('codigoPostal').value;

	const mensaje = `Dirección guardada: \n\nNombre y apellidos: ${nombreApellido}\nDirección: ${direccion}\nCiudad: ${ciudad}\nProvincia: ${provincia}\nCódigo Postal: ${codigoPostal}`;
	alert(mensaje);
}

function validarTarjeta() {
	const nombreCompleto = document.getElementById('nombreCompleto').value;
	const numeroTarjeta = document.getElementById('numeroTarjeta').value;
	const fechaCaducidad = document.getElementById('fechaCaducidad').value;
	const cvc = document.getElementById('cvc').value;

	if (nombreCompleto.trim() === '' || numeroTarjeta.trim() === '' || fechaCaducidad.trim() === '' || cvc.trim() === '') {
		alert('Debe completar todos los campos para realizar la compra.');
		return;
	}

	if (!/^\d+$/.test(numeroTarjeta)) {
		alert('El número de tarjeta debe contener solo dígitos.');
		return;
	}

	if (!/^\d+$/.test(cvc)) {
		alert('El CVC debe contener solo dígitos.');
		return;
	}

	const fechaHoy = new Date();
	const anyo = fechaHoy.getFullYear() % 100;
	const mes = fechaHoy.getMonth() + 1;
	const [mesTarjeta, anyoTarjeta] = fechaCaducidad.split('/').map(val => parseInt(val));

	if (anyoTarjeta < anyo || (anyoTarjeta === anyo && mesTarjeta < mes)) {
		alert('La tarjeta está caducada. Por favor, ingresa una tarjeta válida.');
		return;
	}

	const mensaje = `Venta completada: \n\nNombre completo: ${nombreCompleto}\nNúmero tarjeta: ${numeroTarjeta}\nFecha caducidad: ${fechaCaducidad}\nCVC: ${cvc}`;
	alert(mensaje);
}

function agregarAlCarrito(nombreCoche, precioCoche, imagenCoche) {
	console.log(`Añadido al carrito: ${nombreCoche}, ${precioCoche}, ${imagenCoche}`);
	const coche = { nombre: nombreCoche, precio: precioCoche, imagen: imagenCoche };
	cochesEnCarrito.push(coche);
	localStorage.setItem('carrito', JSON.stringify(cochesEnCarrito));
	console.log('Carrito guardado en localStorage:', cochesEnCarrito);
}

function mostrarCarrito() {
	const listaCoches = document.getElementById("listaCoches");

	cochesEnCarrito.forEach(coche => {

		const fila = document.createElement("tr");
		fila.innerHTML = `
                <td>${coche.nombre}</td>
                <td><img src="${coche.imagen}" style="max-width: 100px;"></td>
                <td>${coche.precio}</td>
            `;
		listaCoches.appendChild(fila);

	});

	mostrarPrecioTotal();
}

function mostrarPrecioTotal() {
	let totalPrecio = 0;

	cochesEnCarrito.forEach(coche => {
		const precioNumerico = Number(coche.precio);
		if (!isNaN(precioNumerico)) {
			totalPrecio += precioNumerico;
		}
	});

	const precioTotalSpan = document.getElementById('precioTotal');
	if (precioTotalSpan) {
		precioTotalSpan.textContent = `${precioNumerico.toFixed(2)}€`;
	}
}

function limpiarCarrito() {
	const nombreCompleto = document.getElementById('nombreCompleto').value;
	const numeroTarjeta = document.getElementById('numeroTarjeta').value;
	const fechaCaducidad = document.getElementById('fechaCaducidad').value;
	const cvc = document.getElementById('cvc').value;

	if (validarTarjeta(nombreCompleto, numeroTarjeta, fechaCaducidad, cvc)) {

		localStorage.removeItem('carrito');

		cochesEnCarrito = [];

		const listaCoches = document.getElementById("listaCoches");
		listaCoches.innerHTML = '';

		const precioTotalSpan = document.getElementById('precioTotal');
		if (precioTotalSpan) {
			precioTotalSpan.textContent = '0.00€';
		}

	}
}

document.addEventListener('DOMContentLoaded', function() {
	mostrarCarrito();
});