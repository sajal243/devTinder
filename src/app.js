const express = require("express");
const connectDB = require("./config/database")
const app = express();

const User = require("./models/user")

// middleware
const {adminAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth)
app.get("/admin/getAllUser", (req, res, next) => {
    res.send("get all users")
});
app.get("/admin/deleteAllUser", (req, res, next) => {
    throw new Error("error in delete user")
    res.send("delete all users")
});
app.use("/", (err, req, res, next) => {
    if(err){
        res.send(500).send("Something went wrong!");
    }
});
 

// format 1
// app.use("/user", (req, res, next) => {
//     res.send("Hello from the server");
//     next();
// }, (req, res) => {
//     res.send("2nd response");
// });

// // format 2
// app.use("/test", [(req, res,next) => {
//     console.log("test response 1")
//     next();
// }, (req, res, next) => {
//     res.send("test response 2")
// }])

app.post("/signup", async (req, res) => {
    const newUser = new User({
        firstName: "Sajal",
        lastName: "Gupta",
        emailId: "sajal@gmail.com",
        age: 24,
        gender: "male"
    })

    try{
        await newUser.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user " + err.message)
    }
})

connectDB().then(() => {
    console.log("Database connection estabilished")
    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
})
.catch((err) => {
    console.error("Database cannot be connected")
});