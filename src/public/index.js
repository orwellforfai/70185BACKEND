const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
});

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
            <p>Titulo: ${item.title}</p>
            <p>Precio: ${item.price}</p>
            <button data-id="${item._id}">Eliminar producto</button>
        `;
        contenedorProductos.appendChild(card);

        card.querySelector("button").addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            eliminarProducto(id);
        });
    });
};

const eliminarProducto = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
});

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        thumbnail: document.getElementById("thumbnail").value,
        status: document.getElementById("status").value === "true"
    };
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
};