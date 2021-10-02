const { mongoose } = require("../conn");
let Schema = mongoose.Schema;

let groups = new Schema({
  nom: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const model = mongoose.model("groups", groups);
module.exports = model;
