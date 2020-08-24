const Category = require('../models/category')
const Transaction = require('../models/transaction')

// Retrieve all categories
module.exports.getAll = () => {
    return Category.find()
    .then(categories => categories)
}

// Retrieve one category
module.exports.getOne = (params) => {
    return Category.findById(params.id)
    .then((category, err) => {
        if(err) return false
        return category
    })
}

// Create a category
module.exports.add = (params) => {
    const category = new Category({
        category: params.category,
        type: params.type
    })
    return category.save()
    .then((category, err) => {
        return(err) ? false : true
    })
}