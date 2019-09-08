const Orders = require("../models/Orders")


exports.newOrder = async (req, res, next) => {
  const order = new Orders(req.body);
  try {
    await order.save();
    res.json({ message: "new order added to the db" });
  } catch (error) {
    console.log(error);
    next();
  }
};


exports.showAllOrders = async (req, res, next) => { 
    try {
     const orders = await Orders.find({}).populate("client").populate({
         path: "order.product",
         model: "Products"
     })
     res.json(orders)
    } catch (error) {
      console.log(error);
      next();
    }
}


exports.showOrderById = async (req, res, next) => {
    const order = await Orders.findById(req.params.idOrder).populate("client").populate({
         path: "order.product",
         model: "Products"
     })
    if(!order) {
        res.json({message : "that order doesn't exist"})
        return next()
    }

    res.json(order)
}

exports.updateOrder = async (req, res, next) => {
     try {
       const order = await Orders.findOneAndUpdate(
         { _id: req.params.idOrder },
         req.body,
         {
           new: true
         }
       )
         .populate("client")
         .populate({
           path: "order.product",
           model: "Products"
         });
       res.json(order)
     } catch (error) {
       console.log(error);
       next();
     }
}


exports.deleteOrderById = async (req, res, next) => {
  try {
    await Orders.findOneAndDelete({ _id: req.params.idOrder });
    res.json({ message: "Order has been deleted" });
  } catch (error) {
    console.log(error);
    next();
  }
};