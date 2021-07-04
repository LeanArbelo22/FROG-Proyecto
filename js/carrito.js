const carrito = [];
let totalProductos = 0;


function agregarProducto(nombre, precio){
    const producto = { 
        nombre: nombre,
        precio: precio
    };

    console.info(`Producto agregado: ${nombre} ${precio}`)

    carrito.push(producto);

    totalProductos = totalProductos + 1;

    document.getElementById('total-productos').innerHTML = `${totalProductos}`

}

var totalCompra = 0;

function mostrarProductos(){

    const compra = document.getElementById('carrito');
    let lista = '';
    

    carrito.forEach(function (articulosCarrito){
        lista += '<li style= "font-size: 18px">' + articulosCarrito.nombre + ' ' + `$${articulosCarrito.precio}` +'</li>';
        totalCompra = totalCompra + articulosCarrito.precio;
    });

    
    compra.innerHTML = '<ul>'+ lista + '</ul>' + `<h5 style="text-align: center">TOTAL $${totalCompra}</h5>`;

    console.log(totalCompra)
};


function exito(){
let confirmacion = confirm(`A pagar: $${totalCompra}, demora aproximada: 1hs. Desea continuar?`)
if (confirmacion){
    alert('Compra realizada con exito')
}  else{
    alert("Compra cancelada")
}
}