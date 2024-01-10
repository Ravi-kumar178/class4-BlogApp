const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//add middleware
app.use(express.json());

//route mounting
const routes = require("./routes/blog");
app.use("/api/v1",routes);

//call the dbConnect
const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT,()=>{
    console.log(`App is started at ${PORT}`);
})

//default routes
app.get("/",(req,res)=>{
    res.send("This is a Home Page");
});