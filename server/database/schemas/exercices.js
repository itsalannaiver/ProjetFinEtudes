const { mongoose } = require("../conn");
let Schema = mongoose.Schema;
const exercicesSchema = new Schema({
  nom: {
    type: Schema.Types.String,
    required: true,
  },
  description:{
    type:Schema.Types.String,
  },
  published:{
    type:Schema.Types.Date,
    default: new Date(),
  },
  questions: [
    {
      question: { type: Schema.Types.String },
      correction: { type: Schema.Types.String },
    },
  ],
  exam: { type: Schema.Types.Boolean, required: true },
  examResponses: [
    {
      etudiant: { type: Schema.Types.ObjectId },
      answers: [{ type: Schema.Types.String }],
    },
  ],
  duration: { type: Schema.Types.Number, required: true },
});

const model = mongoose.model("exercices", exercicesSchema);

module.exports = model;
