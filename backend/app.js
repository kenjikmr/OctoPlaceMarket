const express = require("express");
var cookieParser = require("cookie-parser");
const apiController = require("./controllers/api");

// Create a new instance of the Express app
const app = express();

// express built-in middleware that parses requests based on body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// routes
// Define a route
app.get("/market", apiController.getAllMarkets);
app.get("/market-by-user/:id", apiController.getMarketsByUser);
app.get("/market-successful", apiController.getSellTransactions);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //   res.render('error');
  if (err) console.log(err);
});

// Export the app for use in other modules
module.exports = app;
