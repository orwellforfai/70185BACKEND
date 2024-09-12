
const productsSocket = (socket) => {
    console.log("Nuevo mensaje recibido: ", socket);

    socket.on("product",()=>{
      socket.emit("product", {message: "Producto recibido"});

    })
}
export default productsSocket;
