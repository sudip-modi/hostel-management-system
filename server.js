//create express app
const exp = require("express");
const app = exp();
const path = require("path");
const cors = require("cors");

//connect angular buld with nodejs server
app.use(exp.static(path.join(__dirname, "./dist/hostel-management-system")));
app.use(cors());

//import userApp
const userApp = require("./apis/userApi");
const adduserApp = require("./apis/adduserApi");
const updateuserApp = require("./apis/updateuserApi");

app.use("/user-api", userApp);
app.use("/adduser-api", adduserApp);
app.use("/updateuser-api",updateuserApp);

//get mongo client
const mClient = require("mongodb").MongoClient;
//connect to db server
mClient
  .connect("mongodb://localhost:27017/ca003db")
  .then((client) => {
    //get DB obj
    const ca003Db = client.db("ca003db");
    //get collection object
    const usersCollection = ca003Db.collection("users");
    //share user collection obj
    app.set("usersCollection", usersCollection);

    //get collection object
    const adduserCollection = ca003Db.collection("addusers");
    //share user collection obj
    app.set("adduserCollection", adduserCollection);

    console.log("db connected successfully");
  })
  .catch((err) => console.log("err in db connect", err));

// //create api
// //route to handle GET request
// app.get('/',(req,res)=>{
//     //send response to client
//     res.send({message:"This req is from GET req handler"})
// })

// //route to handle POST request
// app.post('/',(req,res)=>{
//     //send response to client
//     res.send({message:"This req is from POST req handler"})
// })

// //route to handle PUT request
// app.put('/',(req,res)=>{
//     //send response to client
//     res.send({message:"This req is from PUT req handler"})
// })

// //route to handle DELETE request
// app.delete('/',(req,res)=>{
//     //send response to client
//     res.send({message:"This req is from DELETE req handler"})
// })

//

app.use("*", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "./dist/hostel-management-system/index.html")
  );
});

//invalid path
app.use((req, res, next) => {
  res.send({ message: ` ${req.url} is an Invalid path` });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ message: "error occurred", error: err.message });
});

//assign port
app.listen(4000, () => console.log("server is listening st port 4000"));
