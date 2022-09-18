const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

PizzaSchema.virtual("commentCount").get(function () {
  //a virtual keeps track of computed value that  gets evaluated when you try to access the model's properties, this property is not stored inthe dataBase!
  return this.comments.length;
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
