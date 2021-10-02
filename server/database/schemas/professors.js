const { mongoose } = require("../conn");
let Schema = mongoose.Schema;

const professorSchema = new Schema({
  nom: {
    type: Schema.Types.String,
    required: "true",
  },
  prenom: {
    type: Schema.Types.String,
    required: "true",
  },
  modules: [{ type: Schema.Types.ObjectId}],
});

const model = mongoose.model("professors", professorSchema);
module.exports = model;
