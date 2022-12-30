let productos = [
    {id: 1, categoria: "maquillaje", nombre: "Labial Rose", stock: 24, precio: 3500, imgUrl:"./img/rojos.jpg"},
    {id: 2, categoria: "maquillaje", nombre: "Labial Violet", stock: 15, precio: 2500, imgUrl:"./img/rojos.jpg"},
    {id: 3, categoria: "maquillaje", nombre: "Labial Nude", stock: 36, precio: 3000, imgUrl:"./img/rojos.jpg"},
    {id: 4, categoria: "maquillaje", nombre: "Labial Choco", stock: 33, precio: 2000, imgUrl:"./img/rojos.jpg"},
    {id: 5, categoria: "maquillaje", nombre: "Labial Rubi", stock: 42, precio: 3500, imgUrl:"./img/rojos.jpg"},
    {id: 6, categoria: "maquillaje", nombre: "Labial Gloss", stock: 29, precio: 2000,imgUrl:"./img/rojos.jpg"},
    {id: 7, categoria: "maquillaje", nombre: "Paleta Verano", stock: 24, precio: 4500, imgUrl:"./img/verano.jpg"},
    {id: 8, categoria: "maquillaje", nombre: "Paleta Completa", stock: 24, precio: 6000, imgUrl:"./img/completa.jpg"},
    {id: 9, categoria: "accesorios", nombre: "Cartera Negra", stock: 24, precio: 7000, imgUrl:"./img/negra.jpg"},
    {id: 10, categoria: "accesorios", nombre: "Cartera Sobre", stock: 24, precio: 6000, imgUrl:"./img/sobre.jpg"},
    {id: 11, categoria: "maquillaje", nombre: "Paleta Invierno", stock: 24, precio: 4000, imgUrl:"./img/invierno.jpg"},
    {id: 12, categoria: "accesorios", nombre: "Cartera Roja", stock: 24, precio: 5500, imgUrl:"./img/cartera.jpg"}
    
]
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
        <h3>${elementos.nombre}</h3>
        <img src = ${elementos.imgUrl}>
        <h2>Precio unidad: $${elementos.precio}</h2>
        <p>STOCK: ${elementos.stock}</p>
        <button class="boton" id =${elementos.id}>Añadir al carrito</button>
        `
    
    contenedor.appendChild(tarjeta)
    }

let botones= document.getElementsByClassName("boton")
for (const boton of botones) {
    boton.addEventListener("click", agregarCarrito)
}
}
function agregarCarrito(e) {
    let productoABuscar = productos.find(producto => producto.id == e.target.id)
    let posicion = carrito.findIndex(elementos => elementos.id == productoABuscar.id )
    if (posicion != -1) {
        carrito[posicion].unidades++
        carrito[posicion].subTotal = carrito[posicion].unidades * carrito
        [posicion].precio
    } else{
    carrito.push({id: productoABuscar.id, nombre: productoABuscar.nombre, precio: productoABuscar.precio, unidades: 1, subTotal: productoABuscar.precio})
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
            <td>$${producto.subTotal}</td>
        </tr>
    </table>
        `
    }
    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subTotal, 0)
    miCarrito.innerHTML += `
    <h3>TOTAL$${total}</h3>
    `
}
let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
localStorage.removeItem("carrito")
carrito = []
renderizarCarrito(carrito)
})




