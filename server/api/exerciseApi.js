const exerciseRouter = require("express").Router();
const ExerciseModel = require("../database/schemas/exercices");
const ModuleModel = require("../database/schemas/module");
const { ensureAuthenticated, ensureProf } = require("../config/auth");
const mongoose = require("mongoose");

//Create a new Exercise
exerciseRouter.post("/create", ensureAuthenticated, ensureProf, (req, res) => {
  const exercise = new ExerciseModel({
    nom: req.body.nom,
    description: req.body.description,
    questions: req.body.questions,
    exam: req.body.exam,
    duration: req.body.duration,
  });
  exercise.save(function (err) {
    ModuleModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.module) },
      { $push: { exercices: exercise._id } },
      () => {
        return;
      }
    );
  });

  res.json(req.body);
});

// Retrieve One Exercise Questions and Descriptions
exerciseRouter.get("/one/:idExo", ensureAuthenticated, async (req, res) => {
  let response = {};
  response = await ExerciseModel.findById(
    mongoose.Types.ObjectId(req.params.idExo),
    "questions nom description duration exam"
  );
  res.json(response);
});

//retrieve all Exercises In a Module
exerciseRouter.get("/:idMod", ensureAuthenticated, async (req, res) => {
  let response = {};
  let ids = (
    await ModuleModel.find(
      { _id: mongoose.Types.ObjectId(req.params.idMod) },
      "exercices"
    )
  )[0].exercices;

  response = await ExerciseModel.find(
    { _id: { $in: ids } },
    "nom description published exam"
  );

  res.json(response);
});

// Delete Exercise
exerciseRouter.delete(
  "/:idExo",
  ensureAuthenticated,
  ensureProf,
  async (req, res) => {
    ExerciseModel.deleteOne(
      { _id: mongoose.Types.ObjectId(req.params.idExo) },
      () => {
        return;
      }
    );
    res.json({ message: "Delete succesfully" });
  }
);

// Submit Exam
exerciseRouter.post("/submit", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "student") {
    let existingExam = await ExerciseModel.find({
      _id: mongoose.Types.ObjectId(req.body.exam),
      "examResponses.etudiant" : mongoose.Types.ObjectId(req.user.user) ,
    });
    
    if(existingExam.length!==0){
      return res.json({message:"submited already"})
    }
    else{
      ExerciseModel.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.exam) },
        {
          $push: {
            examResponses: {
              etudiant: req.user.user,
              answers: req.body.answers,
            },
          },
        },
        () => {}
      );
      return  res.json(req.body);
    }
   
  }
  res.json({message:"vous etes pas un étudiant "})
});

module.exports = exerciseRouter;
