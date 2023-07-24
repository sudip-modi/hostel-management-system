//create mini expess application (separate route)
const exp = require('express');
const adduserApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require('bcryptjs')
const verifyToken = require("./middlewares/verifyToken");
const jwt = require('jsonwebtoken')

//body parser
adduserApp.use(exp.json());

//GET ALL USERS 
adduserApp.get('/view-users', async (req, res) => {
    try {
      const adduserCollection = req.app.get('adduserCollection');
      const users = await adduserCollection.find().toArray();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users.' });
    }
  });
// adduserApp.get("/add-user",expressAsyncHandler(async(req,res)=>{
//   //get usersCollection
//   const adduserCollection= req.app.get('adduserCollection')
//   //get users
//   let adduser= await adduserCollection.find({status:true}).toArray()
//   //send res
//   res.send({message:"all users",payload:adduser})

// }));
// GET A USER BY username
// adduserApp.get('/users/:username',  expressAsyncHandler(async (req,res)=>{
//   const usersCollection= req.app.get('usersCollection')
//   //get username from url
//   let usernameOfUrl = req.params.username;
//   //find user
//   let user = await usersCollection.findOne({username:usernameOfUrl,status:true})
//   //send res
//   res.send({message:"one user",payload:user})


// }))

// CREATE USER 
adduserApp.post('/add-user',expressAsyncHandler(async (req,res)=>{
//   get adduserCollection
  const adduserCollection= req.app.get('adduserCollection')
//   // get newuser from client
  let newUser = req.body;
//   //check for username which already taken by someone
//   let user = await usersCollection.findOne({username:newUser.username})
//   //if user existed with that username
//   if(user!=null){
//       res.send({message:"Username has already taken. Choose another one"})

//   }else{
// //update status
//       newUser.status=true;
//       //hash password
//       let hashedPassword= await bcryptjs.hash(newUser.password,5)
//       //replace pain password with hashed password
//       newUser.password= hashedPassword;
      //save new user
      await adduserCollection.insertOne(newUser)
      res.send({message:"create new user"})
//       res.status(201).send({message:"created"})
//   }


}))













// //user login
// userApp.post(
//     "/user-login",expressAsyncHandler(async (req, res) => {
//       //get userCollection
//       const usersCollection = req.app.get("usersCollection");
//       //get user cred
//       let userCred = req.body;
//       //veirfy username
//       let user = await usersCollection.findOne({ username: userCred.username });
//       //if user not found
//       if (user === null) {
//         res.send({ message: "Invalid username" });
//       }
//       //if user found
//       else {
//         //compare passwords
//         let result = await bcryptjs.compare(userCred.password, user.password);
//         //if passwords not matched
//         if (result === false) {
//           res.send({ message: "Invalid password" });
//         }
//         //if passwords are also matched
//         else {
//           //create token
//           let signedToken = jwt.sign({ username: user.username },'abcdef', {
//             expiresIn: 20,
//           });
//           //send token inres
//           res.send({
//             message: "Login success",
//             token: signedToken,
//             currentUser: user,
//           });
//         }
//       }
//     }))
//   ;











// DELETE USER BY username
// DELETE USER BY ID
// DELETE USER BY ID
adduserApp.delete('/delete-user/:id', expressAsyncHandler(async (req, res) => {
    const adduserCollection = req.app.get('adduserCollection');
    const id = parseInt(req.params.id);
    
    try {
      // Delete the user with the specified ID from the database
      await adduserCollection.deleteOne({ id: id });
      res.send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }));
  
  
// adduserApp.delete('/update-user/:username', async(req,res)=>{
//     //get usersCollection
//     const usersCollection= req.app.get('usersCollection')
//     //get username from url
//     let usernameOfUrl= req.params.username;
//     //update user status to false
//     await usersCollection.updateOne({username:usernameOfUrl},{$set:{status:false}})
// // send res
// res.send({message:"User deleted"})

// })




// // Restore USER BY username
// userApp.get('/user-restore/:username',expressAsyncHandler( async(req,res)=>{
//     //get usersCollection
//     const usersCollection= req.app.get('usersCollection')
//     //get username from url
//     let usernameOfUrl= req.params.username;
//     //update user status to false
//     await usersCollection.updateOne({username:usernameOfUrl},{$set:{status:true}})
// // send res
// res.send({message:"User Restore "})

// }))



// Assuming you have a MongoDB ObjectId for the user's ID


// adduserApp.get('/update-user/:id', async (req, res) => {
//   try {
//     const adduserCollection = req.app.get('adduserCollection');
//     const userId = req.params.id;

//     // Find the user in the database based on the provided ID
//     const user = await adduserCollection.findOne({ _id: ObjectId(userId) });

//     if (user) {
//       // If user is found, return the user data
//       res.status(200).json(user);
//     } else {
//       // If no user is found with the provided ID, return a 404 error
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (err) {
//     // Handle any error that occurs during the database query
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// });


//smile
// adduserApp.put('view-users/update-user/:id', async (req, res) => {
//   try {
//     const adduserCollection = req.app.get('adduserCollection');
//     const userId = req.params.id;
//     const updatedUser = req.body; // Updated user data from the client

//     // Update the user in the database by finding the user with the provided ID and using the $set operator
//     const result = await adduserCollection.updateOne(
//       { id: userId },
//       { $set: updatedUser }
//     );

//     if (result.modifiedCount > 0) {
//       // If at least one user record was modified (updated successfully)
//       res.status(200).json({ message: 'User updated successfully' });
//     } else {
//       // If no user record was modified (user with the provided ID not found)
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });



// // UPDATE USER BY username
// UPDATE USER BY ID
// adduserApp.put('/view-users/:id', async (req, res) => {
//     try {
//       const adduserCollection = req.app.get('adduserCollection');
//       const userId = req.params.id;
//       const updatedUser = req.body; // Updated user data from the client
  
//       // Update the user in the database by finding the user with the provided ID and using the $set operator
//       const result = await adduserCollection.updateOne(
//         { id: userId },
//         { $set: updatedUser }
//       );
  
//       if (result.modifiedCount > 0) {
//         // If at least one user record was modified (updated successfully)
//         res.status(200).json({ message: 'User updated successfully' });
//       } else {
//         // If no user record was modified (user with the provided ID not found)
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to update user' });
//     }
//   });
// userApp.put('/user/:username', expressAsyncHandler(async(req,res)=>{
//     const usersCollection= req.app.get('usersCollection')
//     //get username from url
//     let usernameOfUrl= req.params.username;
//     // get modified user from client
//     const modifiedUser=req.body;
//     //modify
   
//     await usersCollection.updateOne({username:modifiedUser.usernamel},{$set:{...modifiedUser}})
// // send res
// res.send({message:"User modified"})


// }))






// //private route
// userApp.get("/test-private", expressAsyncHandler(verifyToken,(req, res) => {
//       res.send({ message: "This is private info" });
//     })
//   );



//export userApp

module.exports=adduserApp;