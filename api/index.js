const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");


dotenv.config();
app.use(express.json());  //to post any json obj.. as we try auth/register by postman
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(console.log("connected to MDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
   destination: (req,file,cb) => {
       cb(null,"images")
   },
   filename: (req,file,cb) => {
       cb(null, req.body.name);
   },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {     //upload url for single file upload
  res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", ()=>{
    console.log("backend is running");
}) 