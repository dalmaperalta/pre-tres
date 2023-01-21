fetch("./productos.json")
 .then(response => response.json())
 .then(productos => programa (productos))

//FUNCION JSON
function programa(productos) {
 let miCarrito = document.getElementById("miCarrito")
 let contenedor = document.getElementById("contenedor")
 filtra(productos)

 let carrito = []
 if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
 }
 renderizarCarrito(carrito)

filtra(productos)
 let buscador = document.getElementById("buscador")
 buscador.addEventListener("input", filtradoDeProductos)

 let botones= document.getElementsByClassName("boton")
 for (const boton of botones) {
    boton.addEventListener("click", agregarCarrito)
 }

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
    if (carrito.length === 0) { 
        //librerias
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Carrito vacio',
        showConfirmButton: true,
        timer: 1500,
      })
    }else Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra',
        timer: 1500
      })
    
localStorage.removeItem("carrito")
carrito = []
renderizarCarrito(carrito)

})
 //FUNCIONES
function filtradoDeProductos(e) {
 let productosFiltrados = productos.filter(elementos => elementos.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || elementos.categoria.toLowerCase().includes(buscador.value.toLowerCase())) 
 filtra(productosFiltrados)
}

function filtra(nuevoProducto) {
 contenedor.innerHTML= ""
 for (const elementos of nuevoProducto) {
        
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjetas"
        tarjeta.id = elementos.id
    
        tarjeta.innerHTML = ` 
        <img src= "${elementos.imgUrl}">
        <h3 class="labial">${elementos.nombre}</h3>
        <h2 class="labial-dos">Precio: $${elementos.precio}</h2>
        <button class="boton" id =${elementos.id}>Añadir al carrito</button>
        `
    
 contenedor.appendChild(tarjeta)
  }
 }

function agregarCarrito(e) {
 let productoABuscar = productos.find(producto => producto.id == e.target.id)
 let posicion = carrito.findIndex(elementos => elementos.id == productoABuscar.id )
 //LIBRERIA
    Toastify({
        text: "Agregado al carrito",
        offset: {
          y: 10 
        },style: {
            background: "linear-gradient(to right,#f2e4f5 ,#b00072 )",
          }
      }).showToast();
    if (posicion != -1) {
        carrito[posicion].unidades++
        carrito[posicion].subTotal = carrito[posicion].unidades * carrito
        [posicion].precio
    } else{
    carrito.push({imgUrl: productoABuscar.imgUrl, id: productoABuscar.id, nombre: productoABuscar.nombre, precio: productoABuscar.precio, unidades: 1, subTotal: productoABuscar.precio})
    } 
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderizarCarrito(carrito)
}

function renderizarCarrito(arrayProductos) {
 miCarrito.innerHTML= ''
 for (const producto of arrayProductos){
        miCarrito.innerHTML += `
        <table class="listaCarrito">
        <tr>
            <th>Producto</th>
            <th>Unidades</th>
            <th>Precio</th> 
        </tr>
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.unidades}</td>
            <th>$${producto.precio}</th>
            
        </tr>
    </table>
           `
  }
 let total = carrito.reduce((acc, valorActual) => acc + valorActual.subTotal, 0)
 miCarrito.innerHTML += `
 <h3>Total$${total}</h3>
    `
 }
}


