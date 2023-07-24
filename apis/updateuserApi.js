//create mini expess application (separate route)
const exp = require("express");
const updateuserApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const verifyToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");

// ADD USERS COLLECTION IS THE COLLECTION OF USERS THAT HAVE APPLIED FOR THE HOSTELS

//body parser
updateuserApp.use(exp.json());

//GET ALL USERS
updateuserApp.get("/get-user/:id", async (req, res) => {
  console.log("Hello");
  try {
    // GET THE COLLECTION ADD USERS
    const adduserCollection = req.app.get("adduserCollection");

    // console.log(adduserCollection);
    console.log(req.params.id);

    const user = await adduserCollection
      .find({ id: parseInt(req.params.id) })
      .toArray();

    console.log("hi");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// CREATE USER
updateuserApp.put(
  "/update-user/:id",
  expressAsyncHandler(async (req, res) => {
    //   get adduserCollection
    const adduserCollection = req.app.get("adduserCollection");
    // get newuser from client
    let newUser = req.body;
    const ID = req.params.id;
    //check for username which already taken by someone
    //   let user = await usersCollection.findOne({username:newUser.username})
    //if user existed with that username
    //   if(user!=null){
    //       res.send({message:"Username has already taken. Choose another one"})

    //   }else{
    //update status
    //       newUser.status=true;
    //hash password
    //       let hashedPassword= await bcryptjs.hash(newUser.password,5)
    //replace pain password with hashed password
    //       newUser.password= hashedPassword;
    //save new user
    const query = { id: parseInt(ID) };
    const update = { $set: req.body };
    const options = {};
    adduserCollection.updateOne(query, update, options);
    // await adduserCollection.findOne(newUser);
    res.status(200).send({ message: "Updated new user" });
    //       res.status(201).send({message:"created"})
    //   }
  })
);

module.exports = updateuserApp;
