const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const trainingSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Please add how many date per week you are going to train."],
    },
    distance: {
        type: String,
        required: true,
      },
    time: {
        type: String,
        required: true,
      },

    pace: {
        type: String,
        required: true,
      },  
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      

  },
  {
    timestamps: true,
  }
);

const training = model("Training", trainingSchema);

module.exports = training;