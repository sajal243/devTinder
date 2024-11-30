const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://coderanuj243:mjkhxHPootCilFoX@anujnode.yvjea.mongodb.net/HelloWorld")
}

module.exports = connectDB