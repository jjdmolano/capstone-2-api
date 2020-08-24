const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category')

// Retrieve all categories
router.get('/', (req, res) => {
    CategoryController.getAll()
    .then(categories => res.send(categories))
})

// Retrieve one category
router.get('/:id', (req,res) => {
    CategoryController.getOne({id:req.params.id})
    .then(category => res.send(category))
})

// Create a category
router.post('/', (req, res) => {
    const arg = {
        category: req.body.category,
        type: req.body.type
    }
    CategoryController.add(arg)
    .then(result => res.send(result))
})

module.exports = router