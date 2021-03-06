// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservedTables = [];
var waitList = [];

// Routes
// =============================================================

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservedTables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});

app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    console.log(newTable);
    if(reservedTables.length <= 5 ){
        reservedTables.push(newTable);
        res.json(true);
    } else{
        waitList.push(newTable)
        res.json(false)
    }
});

app.post("/api/clear", function(req,res) {
    reservedTables = []
    waitList = []
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

