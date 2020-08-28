const express = require('express')
const router = express.Router()
const auth = require('../auth')
const UserController = require('../controllers/user')

// USER ROUTES
// Register user
router.post('/', (req, res) => {
    UserController.register(req.body)
    .then(result => res.send(result))
})

// Login user
router.post('/login', (req, res) => {
    UserController.login(req.body)
    .then(result => res.send(result))
})

// Get user details from token
router.get('/details', auth.verify, (req, res) => {
    UserController.getDetails({userId:auth.decode(req.headers.authorization).id})
    .then(result => res.send(result))
})

// Get user details
router.get('/:id', (req, res) => {
    UserController.getDetails({userId:req.params.id})
    .then(result => res.send(result))
})

// CATEGORY ROUTES
// Add user category
router.put('/:id/categories', (req, res) => {

    const arg = {
        userId: req.params.id,
        categoryName: req.body.categoryName,
        categoryType: req.body.categoryType
    }
    UserController.addCategory(arg)
    .then(result => res.send(result))
})

// Delete user category
router.delete('/:id/:categoryId', (req, res) => {
    const arg = {
        userId: req.params.id,
        categoryId: req.params.categoryId
    }
    UserController.deleteCategory(arg)
    .then(result => res.send(result))
})

// TRANSACTION ROUTES
// Add user transaction
router.put('/:id/transactions', (req, res) => {

    const arg = {
        userId: req.params.id,
        categoryName: req.body.categoryName,
        categoryType: req.body.categoryType,
        amount: req.body.amount,
        description: req.body.description
    }
    UserController.addTransaction(arg)
    .then(result => res.send(result))
})

// Delete user transaction
router.delete('/:id/:transactionId', (req, res) => {
    const arg = {
        userId: req.params.id,
        transactionId: req.params.transactionId
    }
    UserController.deleteTransaction(arg)
    .then(result => res.send(result))
})

module.exports = router