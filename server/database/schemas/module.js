const { mongoose } = require("../conn");
let Schema = mongoose.Schema;

const moduleSchema = new Schema({
  nom: {
    type: Schema.Types.String,
    required: true,
  },
  cours: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  exercices: [{ type: Schema.Types.ObjectId }],
});

const model = mongoose.model("modules", moduleSchema);

module.exports = model;
