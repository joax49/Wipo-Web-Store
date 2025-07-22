import express from "express";

export const productsRouter = express.Router()
productsRouter.use(express.json())


productsRouter.get('/getProducts', (req, res) => {

})

productsRouter.get('getFavProducts', (req, res) => {
    
})