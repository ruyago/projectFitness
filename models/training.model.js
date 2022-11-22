const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const trainingSchema = new Schema(
  {
    days: {
      type: Date,
      required: [true, "Please add how many days per week you are going to train."],
    },
    goal: {
        type: String,
        required: true,
      },
    level: {
        type: String,
        required: true,
      },

    description: {
        type: String,
        required: true,
      },  
      

  },
  {
    timestamps: true,
  }
);

const training = model("Training", trainingSchema);

module.exports = training;