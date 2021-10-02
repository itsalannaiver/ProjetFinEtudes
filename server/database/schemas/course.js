const { mongoose } = require("../conn");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  nom: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  description: {
    type: Schema.Types.String,
  },
  file: Schema.Types.Mixed,
  ext:Schema.Types.String,
});

const model = mongoose.model("courses", courseSchema);
module.exports = model;
