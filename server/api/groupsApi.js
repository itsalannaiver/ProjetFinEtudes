const groupsRouter = require("express").Router();
const GroupsModel = require("../database/schemas/groups");
const ModuleModel = require("../database/schemas/module");
const Exercice = require("../database/schemas/exercices");
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../config/auth");
const StudentModel = require("../database/schemas/students");
const Profs = require("../database/schemas/professors");

// Create Groupe
groupsRouter.post("/create", async (req, res) => {
  try {
    GroupsModel.create({
      nom: req.body.nom,
      modules: [],
    });
  } catch (e) {
    return res.status(400).json({ message: e });
  } finally {
    return res.send(req.body);
  }
});

//Add Modules
groupsRouter.post("/addModule", async (req, res) => {
  let mod = new ModuleModel({
    nom: req.body.nom,
  });
  await mod.save(function (err) {
    GroupsModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.group) },
      { $push: { modules: mod._id } },
      () => {
        return;
      }
    );
  });

  res.json(req.body);
});

// Show All Modules
groupsRouter.get("/modules", ensureAuthenticated, async (req, res) => {
  let response = {};

  if (req.user.role === "student") {
    const student = await StudentModel.findOne(
      { _id: mongoose.Types.ObjectId(req.user.user) },
      (err, student) => {}
    );

    const groupe = await GroupsModel.findOne(
      { _id: mongoose.Types.ObjectId(student.groupe) },
      () => {}
    );
    const modules = await ModuleModel.find(
      { _id: { $in: groupe.modules } },'_id nom',
      () => {}
    );
    
    response = modules;
  } else if (req.user.role === "professor") {
    const prof = await Profs.findOne({
      _id: mongoose.Types.ObjectId(req.user.user),
    },()=>{});
    const modules = await ModuleModel.find({ _id: { $in: prof.modules } },'_id nom',()=>{});
    response = modules
  }
  res.json(response);
});

module.exports = groupsRouter;
