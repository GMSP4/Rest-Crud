const Products = require("../models/Products")

const multer = require("multer")
const shortid = require("shortid")


const configurationMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req,file, cb) => {
            cb(null, __dirname+"../../uploads")
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split("/")[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(new Error ("Format is not valid"))
        }
    }
}

//pass configuration and field

const upload = multer(configurationMulter).single("image") // name of field is image

// upload a image or file
exports.uploadFile = (req, res, next) => {
    upload(req, res, function(error){
        if(error) {
            res.json({message : error})
        }
        // pass to the next middleware
        return next()
    })
}


// add new products

exports.newProduct = async (req, res, next) => {
    const product = new Products(req.body)
    try {
        if(req.file.filename) {
            product.image = req.file.filename
        }
        await product.save()
        res.json({message : "new product added to the db"})
    } catch (error) {
        console.log(error)
        next()
    }
}

// show all products

exports.showAllProducts = async (req, res, next) => {
     try {
       const products = await Products.find({});
       res.json(products);
     } catch (error) {
       console.log(error);
       next();
     }
}


// show product by id

exports.showProductById = async (req, res, next) => {
  const product = await Products.findById(req.params.idProduct);
  // if the product not exists
  if (!product) {
    res.json({ message: "Product doesn't exist" });
    next();
  }
  res.json(product);
};

//upload product by id

exports.updateProduct = async (req, res, next) => {
     try {
         const oldProduct = await Products.findById(req.params.idProduct)

         //build a new product
         let newProduct = req.body

         //verify if there is a new product
         if(req.file.filename) {
             newProduct.image = req.file.filename
         } else {
             newProduct.image = oldProduct.image;
         }

        const product = await Products.findOneAndUpdate({_id : req.params.idProduct},
             newProduct, {
            new: true // return the new value
        })
        res.json(product)

    } catch(error) {
        console.log(error)
        next()
    }
}

// delete product by id

exports.deleteProductById = async (req, res, next) => {
    try {
     await Products.findOneAndDelete({_id : req.params.idProduct})
     res.json({message: "Product has been deleted"})
    } catch(error) {
        console.log(error)
        next()
    }
}
