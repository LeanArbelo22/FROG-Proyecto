const carrito = [];
let totalProductos = 0;
let totalCompra;

function agregarProducto(nombre, precio){
    const producto = { 
        nombre: nombre,
        precio: precio
    };

    console.info(`Producto agregado: ${nombre} ${precio}`);

    carrito.push(producto);

    totalProductos = totalProductos + 1;

    document.getElementById('total-productos').innerHTML = `${totalProductos}`
};


function mostrarProductos(){

    const compra = document.getElementById('carrito');
    let lista = '';
    
    totalCompra = 0;

    carrito.forEach(function (articulosCarrito){
        lista += '<li style= "font-size: 18px">' + articulosCarrito.nombre + ' ' + `$${articulosCarrito.precio}` +'</li>';
        totalCompra = totalCompra + articulosCarrito.precio;
    });

   compra.innerHTML = '<ul>'+ lista + '</ul>' + `<h5 style="text-align: center">TOTAL $${totalCompra}</h5>`+ '<button class="col-auto col-sm-4 offset-4 mb-4 btn" id="botonCompra" onclick="exito()">'+`   Comprar   `+'</button>';

    console.log(totalCompra);
};

function exito(){
    let confirmacion = confirm(`A pagar: $${totalCompra}, demora aproximada: 1hs. Desea continuar?`)
        if (confirmacion){ 
            alert('Compra realizada con exito');
            if (totalCompra > 0 && totalCompra < 400){ // solucionar con bucle
                alert(`Usted a generado 1 punto`);
            }else if(totalCompra >= 400 && totalCompra < 800){
                alert('Usted a generado 40 puntos');
            }else if(totalCompra >= 800 && totalCompra < 1200){
                alert('Usted a generado 80 puntos');
            }else if(totalCompra >= 1200 && totalCompra < 1600){
                alert('Usted a generado 120 puntos');
            }else{
                alert('Usted a generado 160 puntos')
            }
        } else{
            alert("Compra cancelada");
        };
};