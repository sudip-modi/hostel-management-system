//create mini expess application (separate route)
const exp = require('express');
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require('bcryptjs')
const verifyToken = require("./middlewares/verifyToken");
const jwt = require('jsonwebtoken')

//body parser
userApp.use(exp.json());

//GET ALL USERS 
userApp.get("/users",expressAsyncHandler(async(req,res)=>{
  //get usersCollection
  const usersCollection= req.app.get('usersCollection')
  //get users
  let users= await usersCollection.find({status:true}).toArray()
  //send res
  res.send({message:"all users",payload:users})

}));
// GET A USER BY username
userApp.get('/users/:username',  expressAsyncHandler(async (req,res)=>{
  const usersCollection= req.app.get('usersCollection')
  //get username from url
  let usernameOfUrl = req.params.username;
  //find user
  let user = await usersCollection.findOne({username:usernameOfUrl,status:true})
  //send res
  res.send({message:"one user",payload:user})


}))

// CREATE USER 
userApp.post('/user',expressAsyncHandler(async (req,res)=>{
    console.log(req.body);
  // get usersCollection
  const usersCollection= req.app.get('usersCollection')
  // get newuser from client
  let newUser = req.body;
  //check for username which already taken by someone
  let user = await usersCollection.findOne({username:newUser.username})
  //if user existed with that username
  if(user!=null){
      res.send({message:"Username has already taken. Choose another one"})

  }else{
//update status
      newUser.status=true;
      //hash password
      let hashedPassword= await bcryptjs.hash(newUser.password,5)
      //replace pain password with hashed password
      newUser.password= hashedPassword;
      //save new user
      await usersCollection.insertOne(newUser)
      res.status(201).send({message:"created"})
  }
}))













//user login
userApp.post(
    "/user-login",expressAsyncHandler(async (req, res) => {
      //get userCollection
      const usersCollection = req.app.get("usersCollection");
      //get user cred
      let userCred = req.body;
      //veirfy username
      let user = await usersCollection.findOne({ username: userCred.username });
      //if user not found
      if (user === null) {
        res.send({ message: "Invalid username" });
      }
      //if user found
      else {
        //compare passwords
        let result = await bcryptjs.compare(userCred.password, user.password);
        //if passwords not matched
        if (result === false) {
          res.send({ message: "Invalid password" });
        }
        //if passwords are also matched
        else {
          //create token
          let signedToken = jwt.sign({ username: user.username },'abcdef', {
            expiresIn: 20,
          });
          //send token inres
          res.send({
            message: "Login success",
            token: signedToken,
            currentUser: user,
          });
        }
      }
    }))
  ;











// DELETE USER BY username
userApp.delete('/user/:username', async(req,res)=>{
    //get usersCollection
    const usersCollection= req.app.get('usersCollection')
    //get username from url
    let usernameOfUrl= req.params.username;
    //update user status to false
    await usersCollection.updateOne({username:usernameOfUrl},{$set:{status:false}})
// send res
res.send({message:"User deleted"})

})




// Restore USER BY username
userApp.get('/user-restore/:username',expressAsyncHandler( async(req,res)=>{
    //get usersCollection
    const usersCollection= req.app.get('usersCollection')
    //get username from url
    let usernameOfUrl= req.params.username;
    //update user status to false
    await usersCollection.updateOne({username:usernameOfUrl},{$set:{status:true}})
// send res
res.send({message:"User Restore "})

}))


// UPDATE USER BY username
userApp.put('/user/:username', expressAsyncHandler(async(req,res)=>{
    const usersCollection= req.app.get('usersCollection')
    //get username from url
    let usernameOfUrl= req.params.username;
    // get modified user from client
    const modifiedUser=req.body;
    //modify
   
    await usersCollection.updateOne({username:modifiedUser.usernamel},{$set:{...modifiedUser}})
// send res
res.send({message:"User modified"})


}))






//private route
userApp.get("/test-private", expressAsyncHandler(verifyToken,(req, res) => {
      res.send({ message: "This is private info" });
    })
  );



//export userApp

module.exports=userApp;