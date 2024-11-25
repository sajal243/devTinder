const express = require("express");

const app = express();

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

app.listen(3000, () => {
    console.log("server is running on port 3000");
});