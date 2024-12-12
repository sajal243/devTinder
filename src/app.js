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

// middleware to convert the json object into js object
app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body)

    try{
        await newUser.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user " + err.message)
    }
});

// get API for user 
app.get("/user", async (req, res) => {
    try{
        const users = await User.findOne({emailId: req.body.emailId });
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        res.send(users);
    }
    catch(err){
        res.status(400).send("Unable to get the user data");
    }
});

// update API --- to update the data of a user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findOneAndUpdate({_id: userId}, data, {
            runValidators: true
        });
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

// delete user api 
app.delete("/delete", async (req, res) => {
    try{
        const userId = req.body.userId;
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully.");
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// feed API -- it will give all the users
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong..")
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