const express = require('express');
const userService = require('../Services/userService');

const multer = require('multer');
const path = require('path');

const userController = express.Router()

const storage = multer.diskStorage({ 
  destination: './upload/images',
  filename: (req, file ,cb)=> {
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({ 
  storage: storage 
});

userController.use("/PhotoUser", express.static('upload/images'));


/*************** Login *************/
userController.post("/login", async (req, res, next) => {
    try {
      const user= await userService.login(
        req.body.email,
        req.body.motDePasse
      );
      res.status(200).json(user);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
});

/*************** Sign up *************/
userController.post("/signup", upload.single('PhotoUser'), async (req, res, next) => {
  try {
    const { firstName, lastName, email, NUmeroTel, motDePasse } = req.body;

    let PhotoUser = null; 
    if (req.file !== undefined) {
      PhotoUser = `http://localhost:3000/PhotoUser/${req.file.filename}`;
    }

    console.log(PhotoUser); 

    const user = await userService.signup(
      firstName,
      lastName,
      email,
      NUmeroTel,
      motDePasse,
      PhotoUser
    );
    res.status(200).json(user);

    console.log(user);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// test upload photo
userController.post("/upload",upload.single('PhotoUser'),(req,res)=>{
    console.log(req.file);
    res.json({
        success: 1,
        profile_url: `http://localhost:3000/PhotoUser/${req.file.filename}`
    })
})


/*************** Google Signup *************/
userController.post("/signupGoogle", async (req, res, next) => {
  try {
    const { firstName, lastName, email, photoUser } = req.body;
    const motDePasse = ""; 
    const numeroTel = 0; 

    const user = await userService.signupGoogle(
      firstName,
      lastName,
      email,
      numeroTel,
      motDePasse,
      photoUser
    );
    res.status(200).json(user);
    console.log(user);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = userController;
