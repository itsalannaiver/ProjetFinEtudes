let usersRouter = require("express").Router();
let StudentModel = require("../database/schemas/students");
let ProfessorModel = require("../database/schemas/professors");
let UserModel = require("../database/schemas/users");
let GroupModel=require('../database/schemas/groups');
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let passport = require("passport");
let ensureAuth = require("../config/auth").ensureAuthenticated;

usersRouter.post("/student/create", async (req, res) => {
  let body = req.body;
  let response = { ...body, status: 200 };
  const student = new StudentModel({
    _id: new mongoose.Types.ObjectId(),
    nom: body.nom,
    prenom: body.prenom,
    groupe: body.groupe,
  });

  let pass = await bcrypt.hash(body.password, await bcrypt.genSalt());
  student.save(function (err) {
    if (err) response = { message: err, status: 400 };
    const user = new UserModel({
      email: body.email,
      password: pass,
      role: "student",
      user: student._id,
    });

    user.save(function (err) {
      if (err) response = { message: err, status: 400 };
    });
  });

  res.status(response.status).json(response);
});

usersRouter.post("/professor/create", async (req, res) => {
  let body = req.body;
  let response = { ...body, status: 200 };
  const professor = new ProfessorModel({
    _id: new mongoose.Types.ObjectId(),
    nom: body.nom,
    prenom: body.prenom,
  });
  let pass = await bcrypt.hash(body.password, await bcrypt.genSalt());
  professor.save(function (err) {
    if (err) response = { message: err, status: 400 };
    const user = new UserModel({
      email: body.email,
      password: pass,
      role: "professor",
      user: professor._id,
    });

    user.save(function (err) {
      if (err) response = { message: err, status: 400 };
    });
  });

  res.status(response.status).json(response);
});

usersRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json({});
});

usersRouter.get("/check/",(req,res,next)=>{
  if(req.user){
    return res.json({loged:true})
  }else{
    return res.status(401).json({loged:false})
  }
})

usersRouter.get('/',ensureAuth,async(req,res,next)=>{
  let info 
  let response={}
  if(req.user.role==="professor"){
    info = await ProfessorModel.findById(req.user.user)
    response={
      nom:info.nom,
      prenom:info.prenom,
      groupe:"Professor",
      role:"Professor",

    }
  }else if (req.user.role==="student"){
    info = await StudentModel.findById(req.user.user)
    group= await GroupModel.findById(info.groupe)
    response = {
      nom:info.nom,
      prenom:info.prenom,
      groupe:group.nom,
      idGroup:info.groupe,
      role:"Student"
    };
  }
  res.json(response)
})

module.exports = usersRouter;
