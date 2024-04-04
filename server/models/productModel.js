// Dependency
const mongoose = require('mongoose');

// Schema 
const productSchema = new mongoose.Schema({
    description: {
        type: String,       
        required: true     
    },
    image: {
        type: String,      
        required: true    
    },
    pricing: {
        type: Number,     
        required: true   
    },
    shippingCost: {
        type: Number,    
        required: true  
    }
});

// Create a model 
const Product = mongoose.model('Product', productSchema);

// Export 
module.exports = Product;
