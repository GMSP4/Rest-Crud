const express = require("express")
const router = express.Router()
const clientController = require("../controllers/clientController")
const productController = require("../controllers/productController")


module.exports = function(){

    //CLIENTS

    //add new clients via POST
    router.post("/clients", clientController.newClient)
    //get all clients
    router.get("/clients", clientController.showClients)
    // get an specific client by id
    router.get("/clients/:idClient", clientController.showClientById)
    //update client
    router.put("/clients/:idClient", clientController.updateClient)
    //delete client
    router.delete("/clients/:idClient", clientController.deleteClientById)

    //PRODUCTS

    router.post("/products", 
    productController.uploadFile, //first I upload the file afterwards the info of the product with the image included
    productController.newProduct)
    // show all products
    router.get("/products", productController.showAllProducts)
    // get an specific product by id
    router.get("/products/:idProduct", productController.showProductById)
    //update products
    router.put("/products/:idProduct", productController.uploadFile, productController.updateProduct)
    //delete product
     router.delete("/products/:idProduct", productController.deleteProductById);


     //ORDERS




     
    return router
}