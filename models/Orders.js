const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({

    client: {
     type: Schema.ObjectId,
     ref: "Clients"
 },
    order: [{ 
    // remember that one order could have multiple products, for that reason I'll use an array of ojtects instead
     product: {
      type: Schema.ObjectId,
      ref: "Products"
    },
     quantity: Number
}],
    total: {
      type: Number
  }
})

module.exports = mongoose.model("Orders", orderSchema)