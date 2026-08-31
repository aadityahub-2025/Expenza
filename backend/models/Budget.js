const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

budgetSchema.index({ user_id: 1, category: 1 }, { unique: true });

budgetSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Budget", budgetSchema);
