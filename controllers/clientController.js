const Clients = require("../models/Clients")

//Add a new client
exports.newClient =  async (req, res, next) => {
    //new instance of the client, body to map each field
   const client = new Clients(req.body)

   try{
       //store the reg
       await client.save()
       res.json({message: "sucessfully added to the db"})

   } catch(error){
       console.log(error)
       next()

   }
}

//Show all clients
exports.showClients = async (req, res, next) => {
    try {
        //pass an emty object that'll be fullfill with the info of the clients
      const clients = await Clients.find({})
      res.json(clients)
    } catch(error) {
        console.log(error)
        next()
    }
}

//Show just a client by id

exports.showClientById = async (req, res, next) => {
    const client = await Clients.findById(req.params.idClient)
    // if the client not exists
    if(!client) {
        res.json({message: "Client doesn't exist"})
        next()
    }
   
    res.json(client)
}

// update clien by id

exports.updateClient = async (req, res, next) => {
    try {
        const client = await Clients.findOneAndUpdate({_id : req.params.idClient}, req.body, {
            new: true
        })
        res.json(client)
    } catch(error) {
        console.log(error)
        next()
    }
}

// delete client by id

exports.deleteClientById = async (req, res, next) => {

    try {
     await Clients.findOneAndDelete({_id : req.params.idClient})
     res.json({message: "client has been deleted"})
    } catch(error) {
        console.log(error)
        next()
    }
}