const { mongoose } = require("../conn");
let Schema = mongoose.Schema;

let students = new Schema({
  nom: {
    type: Schema.Types.String,
    required: true,
    maxLength: 30,
  },
  prenom: {
    type: Schema.Types.String,
    required: true,
    maxLength: 30,
  },
  groupe: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const model = mongoose.model("students", students);

module.exports = model;
