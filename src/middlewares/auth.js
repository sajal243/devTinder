const adminAuth = (req, res, next) => {
    const token = "xnvdnvjdv";
    const isAuthorized = token === "xyz";
    if(isAuthorized){
        next();
    }
    else{
        res.status(401).send("Unauthorized Access")
    }
}

module.exports = {
    adminAuth
}