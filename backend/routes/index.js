const express = require("express");
const apiController = require("../controllers/api");

// Define a route
app.get("/market", apiController.getAllMarkets);
app.get("/market-by-user", apiController.getMarketsByUser);
app.get("/market-successful", apiController.getSellTransactions);

module.exports = router;
