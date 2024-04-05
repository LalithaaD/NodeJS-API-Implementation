//Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./Routes/userroutes");  //Routes
const productRoutes = require("./Routes/productroutes"); 
const orderRoutes = require("./Routes/orderroutes");

const app = express();

// Static Files and Body Parser Middleware
app.use(express.static('public'));
app.use(bodyParser.json({ type: "application/json" }));

// Use routes
app.use("/users", userRoutes);
app.use("/products", productRoutes); 
app.use("/orders", orderRoutes);

// Database Connection
mongoose.connect("mongodb+srv://lalithamadhuri3:H293xmZBpvATp96W@cluster0.a5qz4w7.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

// Start Express Server
const PORT = process.env.PORT || 8081;
app.listen(PORT, function () {
    console.log(`Express Server Connected on Port ${PORT}`);
});
