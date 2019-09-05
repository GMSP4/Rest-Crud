const express = require("express")
const router = express.Router()
const clientController = require("../controllers/clientController")


module.exports = function(){

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

    return router
}