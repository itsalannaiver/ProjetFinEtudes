const courseRouter = require("express").Router();
const { mongoose, upload } = require("../database/conn");
const courseModel = require("../database/schemas/course");
const ModuleModel = require("../database/schemas/module");
const Grid = require("gridfs-stream");
const { ensureAuthenticated, ensureProf } = require("../config/auth");
const path=require('path')

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

//Get All available Courses in a Module
courseRouter.get("/:idMod", ensureAuthenticated, async (req, res) => {
  let response = {};
  let ids = (
    await ModuleModel.find(
      { _id: mongoose.Types.ObjectId(req.params.idMod) },
      "cours"
    )
  )[0].cours;

  response = await courseModel.find({ _id: { $in: ids } });

  res.json(response);
});

// Upload Course
courseRouter.post(
  "/create",
  ensureAuthenticated,
  ensureProf,
  upload.single("cours"),
  async (req, res) => {
    const cours = new courseModel({
      nom: req.body.nom,
      description: req.body.description,
      file: req.file.id,
      ext:path.extname(req.file.filename)
    });
    await cours.save(function (err) {
      ModuleModel.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.module) },
        { $push: { cours: cours._id } },
        () => {
          return;
        }
      );
    });

    res.json(req.body);
  }
);

// Delete Course
courseRouter.delete("/:id", ensureAuthenticated, ensureProf, (req, res) => {
  gfs.files.remove({ _id: mongoose.Types.ObjectId(req.params.id) }, (err) => {
    if (err) return res.status(400).json({ message: "error deleting" });

    courseModel.findOneAndDelete(
      { file: mongoose.Types.ObjectId(req.params.id) },
      (err, doc) => {
        if (err) res.status(400).json({ message: "error deleting the course" });
      }
    );

    return res.json({ message: "deleted succesfully" });
  });
});

// Download Course
courseRouter.get("/download/:id", ensureAuthenticated, (req, res) => {
  gfs.files.findOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "no such file" });
      }

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  );
});

module.exports = courseRouter;
