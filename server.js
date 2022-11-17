//dependencies
require("dotenv").config()
const port = process.env.PORT || 3000
const express = require("express")
const app = express()
const budget = require("./models/budget") //import budget data
const morgan = require("morgan")


// Register Middleware with the App
app.use(express.urlencoded({extended: true})) //parse data from form submissions into req.body basically parse the url and check to see if it's form submission to create a javascript object and then we can use the route to manipulate the js object
app.use(morgan("dev")) //logging middleware //dev, combined, tiny //must add when creating any express app
app.use("/static", express.static("public")) //It's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css



// INDEX ROUTE - GET to /budgets - Returns all budgets
app.get("/budgets/", (req, res) => {

    let bankAccount = 0;
    for (entry of budget) {
        bankAccount += +entry.amount
    }

    // res.send("this works!")
    // res.render(template, data)
    res.render("index.ejs",{budget, bankAccount})
});

// NEW ROUTE - GET to /budgets/new - render a page with a form to create a new budget entry

app.get("/budgets/new", (req, res) => {

    res.render("new.ejs")

})


// CREATE ROUTE - POST to /budgets - receive the data from the form and create an new budget entry and then redirect the user back to the index

app.post("/budgets", (req, res) => {
    console.log(req.body)
    //push the new budget entry into the budget array
    budget.push(req.body)

    //direct the user back to the index
    res.redirect("/budgets")

})




// SHOW ROUTE - GET to /budgets/:index - Returns a single statement 

app.get("/budgets/:index", (req, res) => {

    res.render("show.ejs", {budget, index: req.params.index})
    
})





// Server listener

app.listen(port, () => {
    console.log(`Port is listening on: ${port}`)
})


