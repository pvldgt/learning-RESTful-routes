// npm init 
// npm install express
// npm install ejs
// npm install uuid 

const express = require("express");
const app = express();
const path = require("path");
// get a universally unique identifier 
const { v4: uuid } = require("uuid");


// Telling express how to parse the req.body (via middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// We need to tell our app that we are using ejs 
app.set("view engine", "ejs")
// Using the absolute path for views to be able to access it not only when starting from the folder itself
app.set("views", path.join(__dirname, "views"))

let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "lol that is so funny"
    },
    {
        id: uuid(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        id: uuid(),
        username: "Sk8terBoi",
        comment: "Please delete your account"
    },
    {
        id: uuid(),
        username: "onlysayswoof",
        comment: "woof woof woof"
    }
]

// Route to show all comments 
// INDEX
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

// Route to give user the form to submit a new comment 
// NEW
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
})

// Route to create a new comment 
// CREATE
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    // Now let's redirect the user 
    res.redirect("/comments")
    // res.send("You've successfully added a comment")
})

// Route to show a separate comment, choose by id 
// SHOW
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show", { comment })
})

// Route to gove the user the form to update the comment 
// EDIT
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", { comment });
})

// npm install method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Actually modifying the comment 
// PATCH
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const updatedCommentText = req.body.comment;
    foundComment.comment = updatedCommentText;
    res.redirect("/comments")

})

// DELETE
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments")
})

app.get("/tacos", (req, res) => {
    res.send("GET /tacos response")
})

app.post("/tacos", (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("ON PORT 3000")
})