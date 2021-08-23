const mongoose = require('mongoose'),
      express = require('express'),
      router = express.Router();


const productSchema = require('../model/Product')

router.post ('/create-product', async (req, res, next) => {
    productSchema.create(req.body, (error, data) => {
        console.log(data);
        res.json(data)

    })
})

router.get('/', async (req, res) => {
    productSchema.find((error, data, next) => {
        res.json(data)
    })
})

router.get('/:id', async ( req, res) => {
    console.log(req.params.id)
    productSchema.findOne({id:req.params.id}, (error, data, next) => {
            res.json(data)
    })
})

router.put('/update-product/:id', async ( req, res, next) => {
    productSchema.findOneAndUpdate({id:req.params.id}, {
        $set: req.body
    }, (error, data) => {
        res.json(data)
        console.log("product updated")
    })
})

router.delete('/delete-product/:id', async (req, res, next) => {
    productSchema.findOneAndDelete({id:req.params.id}, (error, data) => {
            res.status(200).json({
                msg: data
            })
    })
})

module.exports = router