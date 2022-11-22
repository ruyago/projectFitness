const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const trainingSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Please add how many date per week you are going to train."],
    },
    exercise: {
        type: String,
        required: true,
      },
    sets: {
        type: Number,
        required: true,
      },

    reps: {
        type: Number,
        required: true,
      },  
      

  },
  {
    timestamps: true,
  }
);

const training = model("Training", trainingSchema);

module.exports = training;